import ContentCard from "@mmccalldev/components/ContentCard";
import {Content} from "@mmccalldev/lib/Content";
import {Col} from "react-bootstrap";
import MagicGridRow from "@mmccalldev/components/MagicGridRow";

interface ContentGridProps {
    content: Content[]
}

export default function ContentGrid({content}: ContentGridProps) {
    return (
        <MagicGridRow xs={1} sm={2} md={3} lg={4}>
            {
                content.map((content, index) => {
                    return (
                        <Col key={index} className={"pb-4"}>
                            <ContentCard {...content}/>
                        </Col>
                    )
                })
            }
        </MagicGridRow>
    )
}
