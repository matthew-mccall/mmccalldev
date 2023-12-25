import {Container} from "react-bootstrap";
import GetYouTubeContent from "@mmccalldev/lib/YouTubeContent";
import GetGitHubContent from "@mmccalldev/lib/GitHubContent";
import GetUnsplashContent from "@mmccalldev/lib/UnsplashContent";
import GetTwitchContent from "@mmccalldev/lib/TwitchContent";
import ContentGrid from "@mmccalldev/components/ContentGrid";
import GitHubCalendarWrapper from "@mmccalldev/components/GitHubCalendar";
import GetInstagramContent from "@mmccalldev/lib/InstagramContent";

async function getContent() {
    const [youtubeContent, githubContent, unsplashContent, twitchContent, instagramContent] = await Promise.all([
        GetYouTubeContent(),
        GetGitHubContent(),
        GetUnsplashContent(),
        GetTwitchContent(),
        GetInstagramContent()]);

    return (await Promise.all([...youtubeContent, ...githubContent, ...unsplashContent, ...twitchContent, ...instagramContent]))
        .sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        });
}

export default async function Home() {
    const content = await getContent();

    const socials: Map<string, string> = new Map([
        ['github', 'https://github.com/matthew-mccall'],
        ['linkedin', 'https://www.linkedin.com/in/96d9/'],
        ['instagram', 'https://www.instagram.com/__mmccall/'],
        ['twitter', 'https://twitter.com/__mmccall'],
        ['youtube', 'https://www.youtube.com/@__mmccall'],
        ['twitch', 'https://www.twitch.tv/mmapptv'],
    ]);

    return (
        <main>
            <div className={'d-flex align-items-center'} style={{height: '67dvh'}}>
                <Container className="text-center">
                    <h1 className={'display-1 fw-semibold'}>Matthew McCall</h1>
                    <p className={'lead'}>Computer Science and Computer Systems Engineering Dual Major at Rensselaer Polytechnic Institute</p>
                    <div className={'d-flex justify-content-center'}>
                        <div className={'d-flex flex-wrap justify-content-center'}>
                            {[...socials].map(([name, url]) => (
                                <a key={name} href={url} className={'fs-3 mx-3'}>
                                    <i className={`bi bi-${name}`}/>
                                </a>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className={'d-flex justify-content-center pb-5'}>
                    <GitHubCalendarWrapper />
                </div>
                <ContentGrid content={content} />
            </Container>
        </main>)
}
