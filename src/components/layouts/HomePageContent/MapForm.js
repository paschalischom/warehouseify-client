import React from 'react';
import styled from "styled-components";
import { MapFormMapTabContent, MapFormPoiTabContent } from "./FormTabContent";
import Typography from "@material-ui/core/Typography";
import FormTabs from '../../reusable/FormTabs'
import NextStepButton from "../../reusable/NextStepButton";

const MapFormGridLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.1fr;
`

const MapFormHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    margin: 35px 0px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export default function MapForm(props) {
    const {index, handleTabChange} = props;

    const onNextButtonClick = (event) => {
        handleTabChange(event, index + 1);
    }

    return (
        <MapFormGridLayout>
            <MapFormHeader>
                <div>
                    <Typography align={"left"} variant={"h5"} color={"primary"}>
                        Map Form
                    </Typography>
                    <Typography variant={"body2"} color={"primary"}>
                        Place pins on the map indicating your already established facilities that you want to supply.
                        See the list of your pins in the 'Points Of Interest' tab!
                    </Typography>
                </div>
                <NextStepButton onTabChangeRequest={(event) => onNextButtonClick(event)}/>
            </MapFormHeader>
            <FormTabs labels={[{ name: 'Map' }, { name: 'Points of Interest' }]}
                      content={[{ item: <MapFormMapTabContent />}, {item: <MapFormPoiTabContent />}]}>
            </FormTabs>
        </MapFormGridLayout>
    );
}
