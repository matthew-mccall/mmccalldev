'use client'

import React, {useState} from "react";
import Script from "next/script";
import {Toast, ToastBody, ToastContainer, ToastHeader} from "react-bootstrap";
import AcrylicStyle from "@mmccalldev/styles/Acrylic.module.css";

export default function CookieDisclaimer() {
    const [showCookieState, setShowCookieState] = useState<boolean>(true)

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
        <Script id="clarity-script" strategy="afterInteractive">
            {`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
               `}
        </Script>
    </>)
}