import {Content} from "@mmccalldev/lib/Content";
import React, {CSSProperties} from "react";
import {Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Stack} from "react-bootstrap";
import Color from "colorjs.io"

export default function ContentCard({image, overlay, icon, color, title, description, link, date}: Content) {

    const cardTitleStyle: CSSProperties = {
        fontFeatureSettings: "'zero', 'ss01', 'ss03', 'cv05', 'cv06', 'cv11'",
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
        let textColor;

        if (color) {
            const backgroundColor = new Color(color);
            const lightForeground = new Color("white");
            const darkForeground = new Color("black");

            textColor = backgroundColor.contrastWCAG21(lightForeground) > backgroundColor.contrastWCAG21(darkForeground) ? "light" : "dark";
        }

        if (overlay) {
            return (<Card>
                <CardImg src={image} alt={title} />
                <CardImgOverlay className={"d-flex flex-column justify-content-end"} style={{backgroundImage: `linear-gradient(transparent 33%, ${color || 'black'})`}}>
                    {cardContent}
                </CardImgOverlay>
            </Card>)
        }

        return (<Card className={`${color ? 'border-0' : ''} ${textColor ? `text-${textColor}` : ''}`} style={color ? {background: color} : undefined}>
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