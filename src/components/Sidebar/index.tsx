'use client'

import {Nav, NavLink} from "react-bootstrap";
import {useEffect, useRef} from "react";

export default function Sidebar() {

    const sidebarRef = useRef(null);

    useEffect(() => {
        if (typeof document === "undefined" || !sidebarRef.current) return;
        import("bootstrap").then(bootstrap => {
            new bootstrap.ScrollSpy(document.body, { target: sidebarRef.current! });
        })
    }, [])

    return (
        <Nav className={`full-height flex-column justify-content-center sticky-top gap-3 offset-from-navbar`} variant={"pills"} ref={sidebarRef}>
            <NavLink href={"#work"}>Work</NavLink>
            <NavLink href={"#projects"}>Projects</NavLink>
            <NavLink href={"#on-campus-work"}>On-Campus Work</NavLink>
            <NavLink href={"#education"}>Education</NavLink>
            <NavLink href={"#recent"}>Recent Activity</NavLink>
            <NavLink href={"#fun"}>Fun Facts</NavLink>
        </Nav>
    )
}