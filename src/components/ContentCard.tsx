import {Content} from "@mmccalldev/lib/Content";
import React, {CSSProperties} from "react";
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Stack} from "react-bootstrap";
import Color from "colorjs.io"

export default function ContentCard({image, overlay, icon, color, title, description, link, date}: Content) {

    const cardTitleStyle: CSSProperties = {
        fontFeatureSettings: "'ss01', 'cv05', 'cv11', 'zero'",
    }


    const cardContent = (<>
        {title && <CardTitle style={cardTitleStyle} dangerouslySetInnerHTML={{ __html: title }} /> }
        {description && <CardText className={'text-truncate'}>{description}</CardText>}
        <Stack direction="horizontal" gap={2}>
            <small className={'me-auto'}>{(new Date(date)).toDateString()}</small>
            <i className={`bi-${icon}`}></i>
            {link &&
            <a href={link} target={"_blank"} rel={"noreferrer"} className={'stretched-link text-reset'}>
                <i className={`bi-link-45deg`}></i>
            </a>
            }
        </Stack>
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
            return (<Card data-bs-theme={theme || 'dark'}>
                <CardImg src={image} alt={title} />
                <CardImgOverlay className={"d-flex flex-column justify-content-end"} style={{backgroundImage: `linear-gradient(transparent 33%, ${color || 'black'})`}}>
                    {cardContent}
                </CardImgOverlay>
            </Card>)
        }

        return (<Card className={color ? 'border-0' : undefined} data-bs-theme={theme} style={color ? {background: color} : undefined}>
            <CardImg src={image} alt={title} variant={"top"} />
            <CardBody>
                {cardContent}
            </CardBody>
        </Card>)
    }

    return (<Card>
        <CardBody>{cardContent}</CardBody>
    </Card>)
}