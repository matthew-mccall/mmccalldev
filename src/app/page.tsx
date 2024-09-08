import {Card, CardBody, CardLink, CardText, CardTitle, Container, Stack} from "react-bootstrap";
import GetYouTubeContent from "@mmccalldev/lib/YouTubeContent";
import GetGitHubContent from "@mmccalldev/lib/GitHubContent";
import GetTwitchContent from "@mmccalldev/lib/TwitchContent";
import ContentGrid from "@mmccalldev/components/ContentGrid";
import BlobBackground from "@mmccalldev/components/BlobBackground";

async function getGitHubContent() {
    return Promise.all(await GetGitHubContent())
}

async function getSocialContent() {
    const [youtubeContent, twitchContent] = await Promise.all([GetYouTubeContent(), GetTwitchContent()]);

    return await Promise.all([...youtubeContent, ...twitchContent])
}

export default async function Home() {
    const gitHubContent = await getGitHubContent();
    const socialContent = await getSocialContent();

    const totalContent = socialContent.concat(gitHubContent)
        .sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        });

    const socials: Map<string, string> = new Map([['github', 'https://github.com/matthew-mccall'], ['linkedin', 'https://www.linkedin.com/in/96d9/'], ['instagram', 'https://www.instagram.com/__mmccall/'], ['twitter-x', 'https://twitter.com/__mmccall'], ['youtube', 'https://www.youtube.com/@__mmccall'], ['twitch', 'https://www.twitch.tv/mmapptv'],]);

    return (<main>
        <BlobBackground className={"bg-black text-light"} blobCount={10}>
            <Stack className={'vh-100'} direction={"vertical"}>
                <div className={'d-flex align-items-center flex-grow-1'}>
                    <Container className="text-center">
                        <h1 className={'display-1 fw-semibold'}>Matthew McCall</h1>
                        <p className={'lead'}>Computer Science and Computer Systems Engineering Dual Major at Rensselaer
                            Polytechnic Institute</p>
                        <Stack direction={"horizontal"} gap={4} className={"d-inline-flex mx-auto"}>
                            {[...socials].map(([name, url]) => (<a key={name} href={url} className={'fs-4 text-reset'}>
                                <i className={`bi-${name}`}/>
                            </a>))}
                        </Stack>
                    </Container>
                </div>
                <Container className={'text-center py-3'}>
                    Learn More <br /> <i className={'bi-chevron-down'} />
                </Container>
            </Stack>
        </BlobBackground>
        <div className={"pt-5 bg-body bg-opacity-25"}>
            <Container>
                <Stack gap={3}>
                    <h2>Projects</h2>
                    <Card>
                        <CardBody>
                            <CardTitle>Open Algebra Software for Inferring Solutions</CardTitle>
                            <CardText>Open Algebra Software for Inferring Solutions (OASIS) is a C++ library for embedding
                                computer algebra and symbolic manipulation. I have led the development of the project since
                                its initial pitch to the Rensselaer Center for Open Source. The project is under continuous
                                active development and continues to introduce new features on a regular basis. I am also
                                responsible for many of its subprojects including the web and desktop applications, and the
                                C wrapper.</CardText>
                            <CardLink href="https://openalgebra.org">Open Algebra Project Website</CardLink>
                        </CardBody>
                    </Card>
                    <h2>Recent Activity</h2>
                    <ContentGrid content={totalContent}/>
                    <div>
                        <h2>Fun Facts</h2>
                        <p>Ah! So you scrolled all the way to the bottom. Well, here are some fun facts about me:</p>
                        <ul>
                            <li>Preferred programming language: C++</li>
                            <li>
                                Favorite games: Minecraft and Tetris
                                <br />
                                <span className={"fw-semibold"}>Bonus fact:</span> I&apos;ve made two plugins for the Paper Minecraft server.
                            </li>
                            <li>The &lsquo;96d9&rsquo; in my LinkedIn link is the first 4 letters of the SHA-1 checksum of my name: <code>echo Matthew McCall | shasum</code>.</li>
                        </ul>
                    </div>
                </Stack>
            </Container>
        </div>
    </main>)
}
