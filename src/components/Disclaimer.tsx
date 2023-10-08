'use client'

import {Toast, ToastContainer} from "react-bootstrap";
import {useState} from "react";
import AcrylicStyle from "@mmccalldev/styles/Acrylic.module.css";

export default function Disclaimer() {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

    return (
        <ToastContainer
            className="p-3"
            position={"bottom-end"}
            containerPosition={"fixed"}
            style={{ zIndex: 1 }}
        >
            <Toast show={show} onClose={toggleShow}>
                <Toast.Header closeButton={true}>
                    <strong className={"me-auto"}>Disclaimer</strong>
                </Toast.Header>
                <Toast.Body className={AcrylicStyle.acrylic}>Hi, to improve my website, I use Microsoft Clarity to see how you interact with my website. By using my site, you agree that Microsoft and I can collect and use this data.</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}