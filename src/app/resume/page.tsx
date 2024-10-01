import {
    Badge,
    Card,
    CardBody, CardFooter,
    CardText,
    CardTitle,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Stack
} from "react-bootstrap";
import Link from "next/link";
import MagicGridRow from "@mmccalldev/components/MagicGridRow";

export default function ResumePage() {
    return (<main>
        <Container>
            <Stack className={"text-center justify-content-center py-5"}>
                <h1 className={"display-1 fw-semibold"}>Matthew McCall</h1>
                <Row xs={1} md={3} className={"g-2 g-lg-5 text-center"}>
                    <Col lg={"auto"} className={"ms-md-auto"}>
                        <a href={"mailto:m-mccall@outlook.com"}>m-mccall@outlook.com</a>
                    </Col>
                    <Col lg={"auto"}>
                        <a href={"https://linkedin.com/in/96d9"}>linkedin.com/in/96d9</a>
                    </Col>
                    <Col lg={"auto"} className={"me-md-auto"}>
                        <Link href={"/resume.pdf"}>PDF Version</Link>
                    </Col>
                </Row>
            </Stack>
            <Stack gap={5}>
                <section>
                    <h2>About</h2>
                    <p className={"lead"}>A highly motivated computer science and computer systems engineering dual major who led multiple teams,
                        contributes to the community, and is passionate for embedded development and robotics.</p>
                    <p><strong>Skills: </strong>C++, React, TypeScript, MATLAB, VHDL, KiCad, SolidWorks, FreeCAD, LaTeX, MS Word, Excel, PowerPoint</p>
                </section>
                <section>
                    <h2>Work Experience</h2>
                    <Row xs={1} md={2} className={"g-4"}>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Undergraduate Research Intern at Scientific Computation Research Center (SCOREC)</CardTitle>
                                    <Stack direction="horizontal" gap={1} className={"mt-2"}>
                                        <Badge>C++</Badge>
                                        <Badge>Django</Badge>
                                        <Badge>LaTeX</Badge>
                                    </Stack>
                                </CardBody>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        Integrated a <strong>GPU-bound memory pool</strong> in Omega_h, a C++ library for
                                        triangle mesh adaptivity which reduced runtime by 30% on high performance computing
                                        systems such as OLCF Frontier.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Authored a <a href={"https://github.com/matthew-mccall/omega_h-kokkos-mempool-paper"}>paper and poster</a> in LaTeX. I presented my work at the Quantum Computing and Spring 2024 Undergraduate Research Symposium Poster Sessions at RPI
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Built a <strong>Django application</strong> to allow researchers to upload their
                                        findings from the Plasma Science Virtual Laboratory to an external data storage
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
                                        Conducted extensive electrical testing of aerospace sensors. Subsequently, I identified potential bottlenecks and submitted written proposals for improvement. I also gained experience using a wide variety of electrical testing equipment.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Wrote Arduino code for detecting potential toxic gasses using Bosch sensors and sending data over Bluetooth. I also developed the corresponding React dashboard that leverages Web Bluetooth for displaying data in real time.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Automated dimensional inspections of manufactured parts, reducing time to inspect parts.
                                    </ListGroupItem>
                                </ListGroup>
                                <CardFooter className="text-muted">Fall 2024</CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </section>
                <section>
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
                                        Currently leading the team for the OASIS project, an open-source C++ library for computer algebra and
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
                                        Eye Robot is a robot that assists the visually impaired in navigation. I wrote C#
                                        software that
                                        leverages ARKit on iOS to construct a 3D model of the room using LiDAR and send commands
                                        to the onboard
                                        ESP32. I also wrote the corresponding Arduino code for the ESP32 that listens and
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
                                        Led the team through the creation of a web application for finding roommates, significant
                                        others, friends, and study peers.
                                    </CardText>
                                </CardBody>
                                <CardFooter className="text-muted">Summer 2024</CardFooter>
                            </Card>
                        </Col>
                    </MagicGridRow>
                </section>
                <section>
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
                                            <small className={"text-muted"}>Spring 2023 - Summer 2024</small>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Served as a RCOS mentor; Mentors provide guidance and technical support for
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
                                        Volunteered at the <strong>Forge</strong>, a student makerspace, by assisting
                                        students with 3D printing.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Worked in the <strong>Mercer XLab</strong>, guiding students through circuit design
                                        and soldering.
                                    </ListGroupItem>
                                </ListGroup>
                                <CardFooter>Summer 2024</CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </section>
                <section>
                    <h2>Education</h2>
                    <Row xs={1} md={2} className={"g-3"}>
                        <Col>
                            <Card className={"h-100"}>
                                <CardBody>
                                    <CardTitle>Rensselaer Polytechnic Institute</CardTitle>
                                    <CardText>Bachelors in Computer Science and Computer Systems Engineering, Class of
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
                                        <li>Regents Advanced Designation with Mastery in Mathematics</li>
                                        <li>Member of the National Honors Society (ARISTA)</li>
                                        <li>Member of the Gateway Institute for Pre-College Education</li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </section>
            </Stack>
        </Container>
    </main>)
}