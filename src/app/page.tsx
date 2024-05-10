import {Container, Stack} from "react-bootstrap";
import GetYouTubeContent from "@mmccalldev/lib/YouTubeContent";
import GetGitHubContent from "@mmccalldev/lib/GitHubContent";
import GetTwitchContent from "@mmccalldev/lib/TwitchContent";
import ContentGrid from "@mmccalldev/components/ContentGrid";
import GetInstagramContent from "@mmccalldev/lib/InstagramContent";

async function getGitHubContent() {
    return Promise.all(await GetGitHubContent())
}

async function getSocialContent() {
    const [youtubeContent, twitchContent, instagramContent] = await Promise.all([
        GetYouTubeContent(),
        GetTwitchContent(),
        GetInstagramContent()]);

    return await Promise.all([...youtubeContent, ...twitchContent, ...instagramContent])
}

export default async function Home() {
    const gitHubContent = await getGitHubContent();
    const socialContent = await getSocialContent();

    const totalContent = socialContent.concat(gitHubContent)
        .sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        });

    const socials: Map<string, string> = new Map([
        ['github', 'https://github.com/matthew-mccall'],
        ['linkedin', 'https://www.linkedin.com/in/96d9/'],
        ['instagram', 'https://www.instagram.com/__mmccall/'],
        ['twitter-x', 'https://twitter.com/__mmccall'],
        ['youtube', 'https://www.youtube.com/@__mmccall'],
        ['twitch', 'https://www.twitch.tv/mmapptv'],
    ]);

    return (
        <main>
            <div className={'d-flex align-items-center'} style={{height: '67lvh'}}>
                <Container className="text-center">
                    <h1 className={'display-1 fw-semibold'}>Matthew McCall</h1>
                    <p className={'lead'}>Computer Science and Computer Systems Engineering Dual Major at Rensselaer Polytechnic Institute</p>
                    <Stack direction={"horizontal"} gap={4} className={"d-inline-flex mx-auto"}>
                        {[...socials].map(([name, url]) => (
                            <a key={name} href={url} className={'fs-4'}>
                                <i className={`bi-${name}`}/>
                            </a>
                        ))}
                    </Stack>
                </Container>
            </div>
            <Container>
                <Stack gap={5}>
                    <ContentGrid content={totalContent} />
                </Stack>
            </Container>
        </main>)
}
