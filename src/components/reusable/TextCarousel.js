import React from 'react';
import Carousel from "react-material-ui-carousel";
import {Typography} from "@material-ui/core";

function Item(props) {
    const { item } = props;

    return (
        <React.Fragment>
            <Typography variant={"h4"} color={"secondary"}>
                {item}
            </Typography>
        </React.Fragment>
    )
}

export default function TextCarousel(props) {
    const { items } = props;

    return (
        <React.Fragment>
            <Carousel
                interval={1000}
                indicators={false}
                animation={'fade'}
                navButtonsAlwaysInvisible

            >
                {
                    items.map((item, i) => (
                        <Item key={i} item={item} />
                    ))
                }
            </Carousel>
        </React.Fragment>
    )
}
