import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <footer className={"bg-body"}>
            <Container className="py-5 text-muted text-center">
                <p>Copyright &copy; {new Date().getFullYear()} Matthew McCall. All rights reserved.</p>
                <p>mmccall.dev is built on several open-source technologies including <a className={"text-reset"} href={"https://hammerjs.github.io/"}>hammer.js</a> and <a className={"text-reset"} href={"https://github.com/e-oj/Magic-Grid"}>e-oj/Magic-Grid</a>!</p>
            </Container>
        </footer>
    )
}