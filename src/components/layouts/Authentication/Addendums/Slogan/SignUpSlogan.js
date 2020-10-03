import React from "react";
import {Typography} from "@material-ui/core";
import TextCarousel from "../../../../reusable/TextCarousel";
import styled from "styled-components";

const SloganContainer = styled.div`    
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.5fr 1.5fr;
`

const SmallPart = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
`

const BigPart = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`

const CarouselWrapper = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;

    margin-left: 8px;
    min-width: 100%;
`

export default function SignUpSlogan({ className }) {
    const items = ['customize.', 'exercise.', 'weaponize.'];

    return (
        <React.Fragment>
            <SloganContainer className={className}>
                <SmallPart>
                    <Typography variant={"subtitle1"} color={"primary"} noWrap align={"center"}>
                        Join Warehouseify &
                    </Typography>
                </SmallPart>
                <BigPart>
                    <Typography variant={"h4"} color={"primary"} noWrap align={"right"}>
                        Start to
                    </Typography>
                </BigPart>
                <CarouselWrapper>
                    <TextCarousel items={items} />
                </CarouselWrapper>
            </SloganContainer>
        </React.Fragment>
    )
}
