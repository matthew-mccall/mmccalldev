'use client'

import React, {createContext, HTMLProps, useEffect, useState} from "react";

export const ThemeContext = createContext("light" as "light" | "dark")

export default function ThemeProvider(props: HTMLProps<HTMLBodyElement>) {
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        if (window && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
    }, [])

    return (
        <ThemeContext.Provider value={theme}>
            <body {...props} data-bs-theme={theme}>
                {props.children}
            </body>
        </ThemeContext.Provider>
    )
}