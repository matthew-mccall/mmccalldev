import {Content, ContentProvider} from "@mmccalldev/lib/Content";
import {Octokit} from "@octokit/rest";
import {
    GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    request: {
        fetch: fetch
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
            };

            content.push(Promise.resolve(contentItem));
        });
    });

    return content;
}

export default GetGitHubContent;