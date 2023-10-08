'use client'

import React, {createContext, CSSProperties, useEffect, useState} from "react";

export const ThemeContext = createContext("light" as "light" | "dark")

export default function ThemeProvider({children, style}: { children: React.ReactNode, style: CSSProperties }) {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
    })

    return (
        <ThemeContext.Provider value={theme}>
            <body style={style} data-bs-theme={theme}>
            {children}
            </body>
        </ThemeContext.Provider>
    )
}