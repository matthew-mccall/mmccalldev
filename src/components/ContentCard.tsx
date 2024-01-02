import {Content} from "@mmccalldev/lib/Content";
import React, {CSSProperties} from "react";
import {Card} from "react-bootstrap";
import Color from "colorjs.io"

export default function ContentCard({image, overlay, icon, color, title, description, link, date}: Content) {

    const cardTitleStyle: CSSProperties = {
        fontFeatureSettings: "'ss01', 'cv11', 'zero'",
    }


    const cardContent = (<>
        {title && <Card.Title style={cardTitleStyle}>{title}</Card.Title> }
        {description && <Card.Text className={'text-truncate'}>{description}</Card.Text>}
        <div className={"d-flex flex-row text-muted"}>
            <small className={'me-auto'}>{(new Date(date)).toDateString()}</small>
            <i className={`bi-${icon} mx-2`}></i>
            {link &&
            <a href={link} target={"_blank"} rel={"noreferrer"} className={'stretched-link text-reset'}>
                <i className={`bi-link-45deg`}></i>
            </a>
            }
        </div>
    </>)

    if (image) {
        let theme;

        if (color) {
            const backgroundColor = new Color(color);
            const lightForeground = new Color("white");
            const darkForeground = new Color("black");

            theme = backgroundColor.contrastWCAG21(lightForeground) > backgroundColor.contrastWCAG21(darkForeground) ? "dark" : "light";
        }

        if (overlay) {
            return (<Card className={"border-0 shadow"} data-bs-theme={theme || 'dark'}>
                <Card.Img src={image} alt={title} />
                <Card.ImgOverlay className={"d-flex flex-column justify-content-end"} style={{backgroundImage: `linear-gradient(transparent 33%, ${color || 'black'})`}}>
                    {cardContent}
                </Card.ImgOverlay>
            </Card>)
        }

        return (<Card className={`border-0 shadow`} data-bs-theme={theme} style={color ? {background: color} : undefined}>
            <Card.Img src={image} alt={title} variant={"top"} />
            <Card.Body>
                {cardContent}
            </Card.Body>
        </Card>)
    }

    return (<Card className={`border-0 shadow`}>
        <Card.Body>{cardContent}</Card.Body>
    </Card>)
}