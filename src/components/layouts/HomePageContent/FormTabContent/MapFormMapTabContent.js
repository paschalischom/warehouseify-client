import React from 'react';
import styled from "styled-components";
import { MapWithToolbarContainer } from './MapTabContent';

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #2e2e31;
`

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1fr;
    height: 500px;
    width: 75%;
    max-width: 700px;
    position: relative;
    
    & > div:first-child {
        position: relative;
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 2;
        grid-row-end: 3;
    }
`

export default function MapFormMapTabContent() {

    return (
        <React.Fragment>
            <OuterWrapper>
                <ContentWrapper>
                    <MapWithToolbarContainer />
                </ContentWrapper>
            </OuterWrapper>
        </React.Fragment>
    )
}
