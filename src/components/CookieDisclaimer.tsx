'use client'

import React, {useState} from "react";
import Clarity from "@microsoft/clarity";
import {Toast, ToastBody, ToastContainer, ToastHeader} from "react-bootstrap";
import AcrylicStyle from "@mmccalldev/styles/Acrylic.module.css";

export default function CookieDisclaimer() {
    const [showCookieState, setShowCookieState] = useState<boolean>(true)
    Clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID!);

    return (<>
        <ToastContainer className={"p-3 z-1 position-fixed"} position={"bottom-end"}>
            <Toast show={showCookieState} onClose={() => setShowCookieState(false)} className={AcrylicStyle.acrylic}>
                <ToastHeader><span className={"me-auto"}>Cookie Statement</span></ToastHeader>
                <ToastBody>
                    We use Microsoft Clarity, which uses cookies, to better understand how you use this website.
                    For more information, see the <a href={"https://privacy.microsoft.com/privacystatement"}>Microsoft
                    Privacy Statement</a>.</ToastBody>
            </Toast>
        </ToastContainer>
    </>)
}