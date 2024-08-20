import ContentCard from "@mmccalldev/components/ContentCard";
import {Content} from "@mmccalldev/lib/Content";
import {Col, Container} from "react-bootstrap";
import MasonryGrid from "@mmccalldev/components/MasonryGrid";

interface ContentGridProps {
    content: Content[]
}

export default function ContentGrid({content}: ContentGridProps) {
    return (
        <Container>
            <MasonryGrid xs={1} sm={2} md={3} xl={4} className={"g-4"}>
                {
                    content.map((content, index) => {
                        return (
                            <Col key={index}>
                                <ContentCard {...content}/>
                            </Col>
                        )
                    })
                }
            </MasonryGrid>
        </Container>
    )
}
