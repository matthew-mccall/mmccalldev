'use client'

import ContentCard from "@mmccalldev/components/ContentCard";
import {Content} from "@mmccalldev/lib/Content";
import {useEffect, useRef} from "react";
import {Col, Container, Row} from "react-bootstrap";

interface ContentGridProps {
    content: Content[]
    maxColumns?: number
}

export default function ContentGrid({content}: ContentGridProps) {

    const rowRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof document !== 'undefined' && rowRef.current) {
            Promise.all([
                import('jquery'),
                import('masonry-layout'),
                import('imagesloaded')
            ]).then(([, Masonry, imagesloaded]) => {
                const msnry = new Masonry.default(rowRef.current!, {
                    itemSelector: '.col',
                    percentPosition: true
                })

                imagesloaded.default(rowRef.current!).on('progress', () => {
                    msnry.layout && msnry.layout()
                })
            })
        }
    })

    return (
        <Container>
            <Row xs={1} small={2} md={3} xl={4} ref={rowRef} className={"g-4"}>
                {
                    content.map((content, index) => {
                        return (
                            <Col key={index}>
                                <ContentCard {...content}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
