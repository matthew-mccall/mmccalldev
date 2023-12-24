import {Container} from "react-bootstrap";
import GetYouTubeContent from "@mmccalldev/lib/YouTubeContent";
import GetGitHubContent from "@mmccalldev/lib/GitHubContent";
import GetUnsplashContent from "@mmccalldev/lib/UnsplashContent";
import GetTwitchContent from "@mmccalldev/lib/TwitchContent";
import ContentGrid from "@mmccalldev/components/ContentGrid";
import GitHubCalendarWrapper from "@mmccalldev/components/GitHubCalendar";

async function getContent() {
    const [youtubeContent, githubContent, unsplashContent, twitchContent] = await Promise.all([
        GetYouTubeContent(),
        GetGitHubContent(),
        GetUnsplashContent(),
        GetTwitchContent()]);

    return (await Promise.all([...youtubeContent, ...githubContent, ...unsplashContent, ...twitchContent]))
        .sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        });
}

export default async function Home() {
    const content = await getContent();
    return (
        <main>
            <div className={'d-flex align-items-center'} style={{height: '67dvh'}}>
                <Container className="text-center">
                    <h1 className={'display-1 fw-semibold'}>Matthew McCall</h1>
                    <p className={'lead'}>Computer Science and Computer Systems Engineering Dual Major at Rensselaer Polytechnic Institute</p>
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
