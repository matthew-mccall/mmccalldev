'use client'

import {Row, RowProps} from "react-bootstrap";
import {useEffect, useRef} from "react";
import MagicGrid from "magic-grid"

export default function MagicGridRow({ children, ...props }: RowProps ) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return
        (new MagicGrid({ container: ref.current, static: true, gutter: 0, useMin: true })).listen();
    }, [])

    return (
        <Row {...props} ref={ref}>
            {children}
        </Row>
    )
}