import "@mmccalldev/styles/globals.scss"

import type {Metadata} from 'next'
import localFont from "next/font/local";
import Footer from "@mmccalldev/components/Footer";
import NavigationBar from "@mmccalldev/components/NavigationBar";
import React from "react";
import CookieDisclaimer from '@mmccalldev/components/CookieDisclaimer';
import {Stack} from "react-bootstrap";
import {defaultFontFeatures, FontFeaturesToCSSString} from "@mmccalldev/lib/DefaultFontFeatures";

const inter = localFont({
    src: "fonts/InterVariable.woff2",
})

export const metadata: Metadata = {
    title: 'Matthew McCall', description: 'Personal website and portfolio',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (<html lang="en">
    <body className={`${inter.className}`} style={{
        fontFeatureSettings: FontFeaturesToCSSString(defaultFontFeatures),
    }}>
    <Stack style={{minHeight: "100svh"}}>
    <NavigationBar/>
        <div className={"flex-grow-1"}>{children}</div>
        <Footer/>
    </Stack>
    <CookieDisclaimer/>
    </body>
    </html>)
}

export const revalidate = 3600  // revalidate at most every hour