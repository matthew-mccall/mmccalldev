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

    let pushDates = pushEvents
        .reduce((acc, event) => {
            if (event.created_at) {
                acc.add(new Date(event.created_at).toLocaleDateString());
            }

            return acc;
        }, new Set<string>)

    let pushedRepos = pushEvents
        .reduce((acc, event) => {
            if (event.repo.name) {
                acc.add(event.repo.name);
            }

            return acc;
        }, new Set<string>)

    pushDates.forEach((date) => {
        pushedRepos.forEach((repo) => {
            const commitCount = pushEvents
                .filter(event =>
                    event.repo.name === repo &&
                    event.created_at &&
                    new Date(event.created_at).toLocaleDateString() === date)
                .reduce((acc, event) => {
                    // @ts-ignore
                    if (event.payload.commits) {
                        // @ts-ignore
                        acc += event.payload.commits.length;
                    }
                    return acc;
                }, 0)

            if (commitCount === 0) {
                return;
            }

            const shortenedRepoName = repo.indexOf('matthew-mccall/') === 0 ? repo.slice(15) : repo;
            const formattedRepoName = shortenedRepoName.replace(/-/g, '\u2011');

            content.push(Promise.resolve({
                title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${formattedRepoName}`,
                date: date,
                icon: 'github',
            }));
        });
    });

    return content;
}

export default GetGitHubContent;