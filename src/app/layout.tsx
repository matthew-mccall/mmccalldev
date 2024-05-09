import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import type {Metadata} from 'next'
import localFont from "next/font/local";
import Footer from "@mmccalldev/components/Footer";
import NavigationBar from "@mmccalldev/components/NavigationBar";
import React from "react";
import ThemeProvider from '@mmccalldev/components/ThemeProvider';

const inter = localFont({
    src: "fonts/Inter.var.woff2",
})

export const metadata: Metadata = {
    title: 'Matthew McCall', description: 'Personal website and portfolio',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (<html lang="en">
    <ThemeProvider className={inter.className} style={{
        fontFeatureSettings: "'ss01', 'cv11'",
    }}>
    <NavigationBar/>
    {children}
    <Footer/>
    </ThemeProvider>
    </html>)
}

export const revalidate = 3600  // revalidate at most every hour