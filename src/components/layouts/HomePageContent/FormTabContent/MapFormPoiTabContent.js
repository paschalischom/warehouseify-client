import React from 'react';
import styled from "styled-components";
import {PoiTable} from "./PoiTabContent";

const ContentWrapper = styled.div`
    height: 100%;
    background-color: #2e2e31;
`

const PoiTableContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: #2e2e31;
`

export default function MapFormPoiTabContent() {
    return (
        <React.Fragment>
            <ContentWrapper>
                <PoiTable />
            </ContentWrapper>
        </React.Fragment>
    )
}
