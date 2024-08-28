'use client'

import {ReactElement, useEffect, useRef, useState} from "react";
import {Fade} from "react-bootstrap";

export default function FadeOnEnter({ children }: { children: ReactElement }) {
    const [isVisible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) setVisible(true);
            })
        })

        observer.observe(ref.current);
        return () => observer.disconnect()
    }, [])

    return (
        <Fade in={isVisible}>
            <div ref={ref}>
                {children}
            </div>
        </Fade>
    )
}