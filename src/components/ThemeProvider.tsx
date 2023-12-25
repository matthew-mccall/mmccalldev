'use client'

import React, {createContext, CSSProperties, useEffect, useState} from "react";

export const ThemeContext = createContext("light" as "light" | "dark")

export default function ThemeProvider({children, style, className}: { children: React.ReactNode, style: CSSProperties, className?: string }) {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
    }, [])

    return (
        <ThemeContext.Provider value={theme}>
            <body className={className} style={style} data-bs-theme={theme}>
            {children}
            </body>
        </ThemeContext.Provider>
    )
}