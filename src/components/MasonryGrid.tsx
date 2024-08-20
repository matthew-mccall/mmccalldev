'use client'

import {useEffect, useRef} from "react";
import {Row, RowProps} from "react-bootstrap";
import imagesloaded from "imagesloaded";

export default function MasonryGrid({ children, ...props }: RowProps ) {

    const rowRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof document === 'undefined' || !rowRef.current) { return; }

        import('masonry-layout').then(Masonry => {
            const msnry = new Masonry.default(rowRef.current!, {
                itemSelector: '.col',
                percentPosition: true
            })

            imagesloaded(rowRef.current!).on('progress', () => {
                msnry.layout && msnry.layout()
            })
        })
    }, [])

    return (
        <Row {...props} ref={rowRef}>
            {children}
        </Row>
    )
}
