'use client'

import AcrylicStyle from "@mmccalldev/styles/Acrylic.module.css";
import {useEffect, useRef, useState} from "react";
import {Container, Nav, Navbar, NavbarText, NavLink, Offcanvas} from "react-bootstrap";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface NavigationBarEntry {
    name: string;
    link: string;
    icon?: string;
}

export default function NavigationBar() {
    const [show, setShow] = useState(false);
    const [offcanvasAcrylic, setOffcanvasAcrylic] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const navStyles = ["shadow"];

    useEffect(() => {
        if (typeof document === "undefined") return;

        const Hammer = require("hammerjs");

        let hammer = new Hammer(document.body);
        hammer.on("swipeleft", () => {
            if (window.innerWidth >= 992) return;
            handleShow();
        });

        hammer.on("swiperight", () => {
            if (window.innerWidth >= 992) return;
            handleClose();
        });

        if (!ref.current) return;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                ref.current!.classList.add(...navStyles);
            } else {
                ref.current!.classList.remove(...navStyles);
            }
        });
    });

    const handleShow = () => {
        setShow(true);
        setOffcanvasAcrylic(AcrylicStyle.acrylic);
    };
    const handleClose = () => {
        setShow(false);
        setOffcanvasAcrylic(null);
    };

    const pathname = usePathname();
    const navLinks: NavigationBarEntry[] = [
        {name: "home", link: "/"},
        {name: "resume", link: "/resume"},
        {name: "papers", link: "/papers"},
        {name: "docs", link: "https://docs.mmccall.dev", icon: "box-arrow-up-right"},
    ];

    return (
        <Navbar
            bg={"body"}
            className={`bg-opacity-75 ${AcrylicStyle.acrylic}`}
            expand={"lg"}
            sticky="top"
            ref={ref}
        >
            <Container>
                <Navbar.Brand href={"/"}>mmccall.dev</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow}>
                    <i className={"bi-list fs-2"}/>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                    id={"offcanvasNavbar"}
                    className={`bg-body bg-opacity-75 ${offcanvasAcrylic}`}
                    aria-labelledby={"offcanvasNavbarLabel"}
                    placement={"end"}
                    show={show}
                    onHide={handleClose}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            mmccall.dev
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                            className={"justify-content-end flex-grow-1 pe-3"}
                            activeKey={pathname}
                            variant={"underline"}
                        >
                            {navLinks.map((entry) => (
                                <Link href={entry.link} key={entry.name} passHref legacyBehavior>
                                    <NavLink eventKey={entry.link}>
                                        {entry.name}
                                        {entry.icon && <i className={`bi-${entry.icon} ms-2`}/>}
                                    </NavLink>
                                </Link>
                            ))}
                            <NavbarText className={"text-muted d-lg-none"}>
                                Pro tip: Swift left to open the navigation menu and swipe right
                                to close it.
                            </NavbarText>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}