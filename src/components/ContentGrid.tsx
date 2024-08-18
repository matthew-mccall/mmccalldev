'use client'

import ContentCard from "@mmccalldev/components/ContentCard";
import MagicGrid from "magic-grid"
import {Content} from "@mmccalldev/lib/Content";
import {useEffect, useRef} from "react";
import {Col, Container, Row} from "react-bootstrap";

interface ContentGridProps {
    content: Content[]
}

export default function ContentGrid({content}: ContentGridProps) {

    const rowRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof document === 'undefined' || !rowRef.current) {
            return;
        }

        const magicGrid = new MagicGrid({
            container: rowRef.current,
            static: true,
        })
        magicGrid.listen();
    }, [])

    return (
        <Container>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className={"g-0"} ref={rowRef}>
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
