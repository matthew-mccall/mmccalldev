import {
    Badge,
    Card,
    CardBody,
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
import MasonryGrid from "@mmccalldev/components/MasonryGrid";

export default function ResumePage() {
    return (<main>
        <Container className={"mt-5"}>
            <div className={"text-center"}>
                <h1 className={"display-1 fw-semibold"}>Matthew McCall</h1>
            </div>
            <Stack gap={3}>
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
                <div>
                    <h2>About</h2>
                    <p className={"lead"}>A highly motivated computer science and computer systems engineering dual major who led multiple teams,
                        contributes to the community, and is passionate for embedded development and robotics.</p>
                </div>
                <div>
                    <h2>Project Experience</h2>
                    <MasonryGrid xs={1} sm={2} lg={3} className={"g-3"}>
                        <Col>
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
                            </Card>
                        </Col>
                        <Col>
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
                            </Card>
                        </Col>
                        <Col>
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
                            </Card>
                        </Col>
                    </MasonryGrid>
                </div>
                <div>
                    <h2>Research and On-Campus Work</h2>
                    <MasonryGrid xs={1} sm={2} lg={3} className={"g-3"}>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Scientific Computation Research Center (SCOREC)</CardTitle>
                                </CardBody>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        Integrated a <strong>GPU-bound memory pool</strong> in Omega_h, a C++ library for
                                        triangle mesh adaptivity which reduced runtime by 30% on high performance computing
                                        systems such as OLCF Frontier.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Built a <strong>Django application</strong> to allow researchers to upload their
                                        findings from the Plasma Science Virtual Laboratory to an external data storage
                                        website.
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Rensselaer Center for Open Source (RCOS)</CardTitle>
                                </CardBody>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        Contributed to the OASIS and glibby projects.
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Currently a RCOS mentor; Mentors provide guidance and technical support for multiple
                                        projects.
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
                            </Card>
                        </Col>
                    </MasonryGrid>
                </div>
                <div>
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
                </div>
            </Stack>
        </Container>
    </main>)
}