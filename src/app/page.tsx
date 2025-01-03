import GitHubCalendar from "react-github-calendar";

export const revalidate = 3600 // invalidate every hour

import Image from "next/image";

import {
    Badge,
    Card,
    CardBody, CardFooter,
    CardLink,
    CardText,
    CardTitle,
    Col,
    Container,
    ListGroup, ListGroupItem, Row,
    Stack
} from "react-bootstrap";

import ContentGrid from "@mmccalldev/components/ContentGrid";
import MagicGridRow from "@mmccalldev/components/MagicGridRow";
import Sidebar from "@mmccalldev/components/Sidebar";
import GetYouTubeContent from "@mmccalldev/lib/YouTubeContent";
import GetGitHubContent from "@mmccalldev/lib/GitHubContent";
import GetTwitchContent from "@mmccalldev/lib/TwitchContent";

import MatthewHandwritten from "../../public/Matthew.svg"
import {Suspense} from "react";

async function getContent() {
    const [youtubeContent, twitchContent, githubContent] = await Promise.all([GetYouTubeContent(), GetTwitchContent(), GetGitHubContent()]);
    return await Promise.all([...youtubeContent, ...twitchContent, ...githubContent])
}

const Matthew = () => <Suspense fallback={"Matthew"}><Image src={MatthewHandwritten} alt={"Matthew"} style={{ height: "1em", width: "4em", fill: "white" }}/></Suspense>

export default async function Home() {
    const content = (await getContent())
        .sort((a, b) => {
            return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
        });

    const socials: Map<string, string> = new Map([['github', 'https://github.com/matthew-mccall'], ['linkedin', 'https://www.linkedin.com/in/96d9/'], ['instagram', 'https://www.instagram.com/__mmccall/'], ['twitter-x', 'https://twitter.com/__mmccall'], ['youtube', 'https://www.youtube.com/@__mmccall'], ['twitch', 'https://www.twitch.tv/mmapptv'],]);

    return (<main>
        <Stack className={`full-height`} direction={"vertical"}>
            <div className={'d-flex align-items-center flex-grow-1'}>
                <Container>
                    <Row xs={1} lg={2} className={"py-3"}>
                        <Col lg className={"d-flex flex-column justify-content-center"}>
                            <div className={"display-1 fw-normal"}>
                                Hi, my name is <span className={"text-decoration-underline"}>Matthew,</span> and I like to build circuits, robots, and websites.
                            </div>
                            <Stack direction={"horizontal"} className={"flex-wrap py-5 fs-3 gap-4 gap-lg-5 justify-content-center justify-content-lg-start"}>
                                {[...socials].map(([name, url]) => (<a key={name} href={url} className={'text-reset'}>
                                    <i className={`bi-${name}`}/>
                                </a>))}
                            </Stack>
                        </Col>
                        <Col lg className={"d-flex flex-column justify-content-center"}>
                            <MagicGridRow xs={1} xl={2}>
                                <Col className={"pb-4"}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Open Algebra Software for Inferring Solutions</CardTitle>
                                            <CardText>Open Algebra Software for Inferring Solutions (OASIS) is a C++ library
                                                for embedding
                                                computer algebra and symbolic manipulation. I have led the development of
                                                the project since
                                                its initial pitch to the Rensselaer Center for Open Source. The project is
                                                under continuous
                                                active development and continues to introduce new features on a regular
                                                basis. I am also
                                                responsible for many of its subprojects including the web and desktop
                                                applications, and the
                                                C wrapper.</CardText>
                                            <CardLink href="https://openalgebra.org">Open Algebra Project Website</CardLink>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className={"pb-4"}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>superround</CardTitle>
                                            <CardText>superround is a library that uses Bezier curves to create smoother
                                                rounded corners</CardText>
                                            <CardLink href="https://docs.mmccall.dev/superround">Documentation</CardLink>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className={"pb-4"}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>Bulk URl Navigator</CardTitle>
                                            <CardText>Bulk URl Navigator (BURN) is an extension for Firefox that allows you
                                                to paginate through a list of URLs in a single tab.</CardText>
                                            <CardLink href="https://addons.mozilla.org/addon/burn/">BURN on AMO</CardLink>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </MagicGridRow>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className={'text-center pb-3'}>
                <a href={"#content"} className={"text-reset text-decoration-none"}>Learn More <br /><i className={'bi-chevron-down'} /></a>
            </Container>
        </Stack>
        <div className={"pt-5 rounded-top-4 bg-body"} id={"content"}>
            <Container>
                <Stack gap={5}>
                    <Stack direction={"horizontal"} className={"justify-content-center"}>
                        <GitHubCalendar username={"matthew-mccall"}/>
                    </Stack>
                    <section>
                        <p className={"lead"}>A highly motivated computer science and computer systems
                            engineering dual
                            major who led multiple teams,
                            contributes to the community, and is passionate for embedded development and
                            robotics.</p>
                        <p><strong>Skills: </strong>C++, React, TypeScript, MATLAB, VHDL, KiCad, SolidWorks,
                            FreeCAD,
                            LaTeX, MS Word, Excel, PowerPoint</p>
                    </section>
                    <Row>
                        <Col xs={"auto"} className={"d-none d-lg-block"}>
                            <Sidebar />
                        </Col>
                        <Col>
                            <Stack gap={5}>
                                <section id={"work"}>
                                    <h2>Work Experience</h2>
                                    <Row xs={1} md={2} className={"g-4"}>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Undergraduate Research Intern at Scientific Computation
                                                        Research
                                                        Center (SCOREC)</CardTitle>
                                                    <Stack direction="horizontal" gap={1} className={"mt-2"}>
                                                        <Badge>C++</Badge>
                                                        <Badge>Django</Badge>
                                                        <Badge>LaTeX</Badge>
                                                    </Stack>
                                                </CardBody>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem>
                                                        Integrated a <strong>GPU-bound memory pool</strong> in Omega_h,
                                                        a C++
                                                        library for
                                                        triangle mesh adaptivity which reduced runtime by 30% on high
                                                        performance
                                                        computing
                                                        systems such as OLCF Frontier.
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Authored a <a
                                                        href={"https://github.com/matthew-mccall/omega_h-kokkos-mempool-paper"}>paper
                                                        and poster</a> in LaTeX. I presented my work at the Quantum
                                                        Computing and
                                                        Spring 2024 Undergraduate Research Symposium Poster Sessions at
                                                        RPI
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Built a <strong>Django application</strong> to allow researchers
                                                        to upload
                                                        their
                                                        findings from the Plasma Science Virtual Laboratory to an
                                                        external data
                                                        storage
                                                        website.
                                                    </ListGroupItem>
                                                </ListGroup>
                                                <CardFooter className="text-muted">Fall 2022 - Summer 2024</CardFooter>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Engineering and Quality Intern at HarcoSemco</CardTitle>
                                                    <Stack direction="horizontal" gap={1} className={"mt-2"}>
                                                        <Badge>Arduino C++</Badge>
                                                        <Badge>React</Badge>
                                                    </Stack>
                                                </CardBody>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem>
                                                        Conducted extensive electrical testing of aerospace sensors.
                                                        Subsequently, I
                                                        identified potential bottlenecks and submitted written proposals
                                                        for
                                                        improvement. I also gained experience using a wide variety of
                                                        electrical
                                                        testing equipment.
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Wrote Arduino code for detecting potential toxic gasses using
                                                        Bosch sensors
                                                        and sending data over Bluetooth. I also developed the
                                                        corresponding React
                                                        dashboard that leverages Web Bluetooth for displaying data in
                                                        real time.
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Automated dimensional inspections of manufactured parts,
                                                        reducing time to
                                                        inspect parts.
                                                    </ListGroupItem>
                                                </ListGroup>
                                                <CardFooter className="text-muted">Fall 2024</CardFooter>
                                            </Card>
                                        </Col>
                                    </Row>
                                </section>
                                <section id={"projects"}>
                                    <h2>Project Experience</h2>
                                    <MagicGridRow xs={1} sm={2} lg={3}>
                                        <Col className={"pb-3"}>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>
                                                        Open Algebra Software for Inferring Solutions (OASIS)
                                                    </CardTitle>
                                                    <Stack direction="horizontal" gap={1} className={"my-2"}>
                                                        <Badge>C++</Badge>
                                                        <Badge>C</Badge>
                                                    </Stack>
                                                    <CardText>
                                                        Currently leading the team for the OASIS project, an open-source
                                                        C++ library
                                                        for computer algebra and
                                                        symbolic manipulation.
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter className="text-muted">Fall 2023 - Summer 2024</CardFooter>
                                            </Card>
                                        </Col>
                                        <Col className={"pb-3"}>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>
                                                        Eye Robot
                                                    </CardTitle>
                                                    <Stack direction="horizontal" gap={1} className={"my-2"}>
                                                        <Badge>C#</Badge>
                                                        <Badge>Arduino C++</Badge>
                                                    </Stack>
                                                    <CardText>
                                                        Eye Robot is a robot that assists the visually impaired in
                                                        navigation. I
                                                        wrote C#
                                                        software that
                                                        leverages ARKit on iOS to construct a 3D model of the room using
                                                        LiDAR and
                                                        send commands
                                                        to the onboard
                                                        ESP32. I also wrote the corresponding Arduino code for the ESP32
                                                        that
                                                        listens and
                                                        responds to the
                                                        commands.
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter className="text-muted">Summer 2024</CardFooter>
                                            </Card>
                                        </Col>
                                        <Col className={"pb-3"}>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>
                                                        Roster
                                                    </CardTitle>
                                                    <Stack direction="horizontal" gap={1} className={"my-2"}>
                                                        <Badge>Next.JS</Badge>
                                                        <Badge>MongoDB</Badge>
                                                    </Stack>
                                                    <CardText>
                                                        Led the team through the creation of a web application for
                                                        finding
                                                        roommates, significant
                                                        others, friends, and study peers.
                                                    </CardText>
                                                </CardBody>
                                                <CardFooter className="text-muted">Summer 2024</CardFooter>
                                            </Card>
                                        </Col>
                                    </MagicGridRow>
                                </section>
                                <section id={"on-campus-work"}>
                                    <h2>Research and On-Campus Work</h2>
                                    <Row xs={1} md={2} className={"g-3"}>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Rensselaer Center for Open Source (RCOS)</CardTitle>
                                                </CardBody>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem>
                                                        Contributed to the OASIS and glibby projects.
                                                        <div>
                                                            <small className={"text-muted"}>Spring 2023 - Summer
                                                                2024</small>
                                                        </div>
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Served as a RCOS mentor; Mentors provide guidance and technical
                                                        support for
                                                        multiple projects.
                                                        <div>
                                                            <small className={"text-muted"}>Summer 2024</small>
                                                        </div>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Student Makerspaces</CardTitle>
                                                </CardBody>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem>
                                                        Volunteered at the <strong>Forge</strong>, a student makerspace,
                                                        by
                                                        assisting
                                                        students with 3D printing.
                                                    </ListGroupItem>
                                                    <ListGroupItem>
                                                        Worked in the <strong>Mercer XLab</strong>, guiding students
                                                        through circuit
                                                        design
                                                        and soldering.
                                                    </ListGroupItem>
                                                </ListGroup>
                                                <CardFooter className={"text-muted"}>Summer 2024</CardFooter>
                                            </Card>
                                        </Col>
                                    </Row>
                                </section>
                                <section id={"education"}>
                                    <h2>Education</h2>
                                    <Row xs={1} md={2} className={"g-3"}>
                                        <Col>
                                            <Card className={"h-100"}>
                                                <CardBody>
                                                    <CardTitle>Rensselaer Polytechnic Institute</CardTitle>
                                                    <CardText>Bachelors in Computer Science and Computer Systems
                                                        Engineering, Class
                                                        of
                                                        2026</CardText>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>Benjamin N. Cardozo High School</CardTitle>
                                                    <CardText>
                                                        High School Diploma, Class of 2022
                                                    </CardText>
                                                    <ul>
                                                        <li>Regents Advanced Designation with Mastery in Mathematics
                                                        </li>
                                                        <li>Member of the National Honors Society (ARISTA)</li>
                                                        <li>Member of the Gateway Institute for Pre-College Education
                                                        </li>
                                                    </ul>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </section>
                                <section id={"recent"}>
                                    <h2>Recent Activity</h2>
                                    <ContentGrid content={content}/>
                                </section>
                                <section id={"fun"}>
                                    <h2>Fun Facts</h2>
                                    <p>Ah! So you scrolled all the way to the bottom. Well, here are some fun facts
                                        about me:</p>
                                    <ul>
                                        <li>Preferred programming language: C++</li>
                                        <li>
                                            Favorite games: Minecraft and Tetris
                                            <br/>
                                            <span className={"fw-semibold"}>Bonus fact:</span> I&apos;ve made two
                                            plugins for the
                                            Paper Minecraft server.
                                        </li>
                                        <li>The &lsquo;96d9&rsquo; in my LinkedIn link is the first 4 letters of the
                                            SHA-1 checksum
                                            of my name: <code>echo Matthew McCall | shasum</code>.
                                        </li>
                                    </ul>
                                </section>
                            </Stack>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </div>
    </main>)
}
