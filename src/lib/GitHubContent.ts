import {Content, ContentProvider} from "@mmccalldev/lib/Content";
import {Octokit} from "@octokit/rest";
import {
    GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    request: {
        fetch: (input: RequestInfo | URL, init: RequestInit | undefined) => {
            return fetch(input, {...init, next: {revalidate: 60}});
        }
    }
});

type PublicEventsForUserType = GetResponseDataTypeFromEndpointMethod<
    typeof octokit.activity.listPublicEventsForUser
>;

const GetGitHubContent: ContentProvider = async () => {
    const res = await octokit.activity.listPublicEventsForUser({
        username: 'matthew-mccall',
    });

    if (!res.data) {
        return [];
    }

    let content: Promise<Content>[] = [];

    let pushEvents: PublicEventsForUserType = res.data.filter((event) => event.type === 'PushEvent' && event.actor.login === 'matthew-mccall');

    // Group pushEvents by date and repository
    const groupedPushEvents: { [key: string]: { [key: string]: number } } = {};

    pushEvents.forEach((event) => {
        const date = event.created_at ? event.created_at.split('T')[0] : '';
        const repo = event.repo.name;

        if (!groupedPushEvents[date]) {
            groupedPushEvents[date] = {};
        }

        if (!groupedPushEvents[date][repo]) {
            groupedPushEvents[date][repo] = 0;
        }

        groupedPushEvents[date][repo]++;
    });

    // Add corresponding Content to the content array
    Object.entries(groupedPushEvents).forEach(([date, repos]) => {
        Object.entries(repos).forEach(([repo, commitCount]) => {
            const repoName = repo.replace('matthew-mccall/', '');

            const contentItem: Content = {
                date,
                title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`,
                icon: 'github',
                value: commitCount
            };

            content.push(Promise.resolve(contentItem));
        });
    });

    // Filter for pull request merge events
    let pullRequestEvents: any[] = res.data.filter((event: any) => event.type === 'PullRequestEvent' && event.payload.action === 'closed' && event.payload.pull_request.merged);

    // Add corresponding Content to the content array for pull request merge events
    pullRequestEvents.forEach((event) => {
        const pullRequestNumber = event.payload.pull_request.number;
        const pullRequestLink = event.payload.pull_request.html_url;
        const repoName = event.repo.name.replace('matthew-mccall/', '');

        const contentItem: Content = {
            date: event.created_at ? event.created_at.split('T')[0] : '',
            title: `Merged pull request #${pullRequestNumber} into ${repoName}`,
            icon: 'github',
            link: pullRequestLink,
            value: 1
        };

        content.push(Promise.resolve(contentItem));
    });

    return content;
}

export default GetGitHubContent;