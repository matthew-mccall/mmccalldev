import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className={"py-5"}>
            <Container className="text-muted text-center">
                Copyright &copy; {new Date().getFullYear()} Matthew McCall. All rights reserved.
            </Container>
        </footer>
    )
}