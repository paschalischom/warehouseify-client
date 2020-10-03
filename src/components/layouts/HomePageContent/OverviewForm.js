import React from 'react';
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import { OverviewFormFinalLookTabContent } from "./FormTabContent";
import FormTabs from "../../reusable/FormTabs";

const OverviewFormLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.1fr;
`

const OverviewFormHeader = styled.div`
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

export default function OverviewForm(props) {
    const { handleTabChange, index } = props;

    return (
        <OverviewFormLayout>
            <OverviewFormHeader>
                <div>
                    <Typography align={"left"} variant={"h5"} color={"primary"}>
                        Overview
                    </Typography>
                    <Typography variant={"body2"} color={"primary"}>
                        Check all the input parameters one last time and hit the 'Search Now' button!
                    </Typography>
                </div>
            </OverviewFormHeader>
            <FormTabs labels={[{ name: 'Final Look' }]}
                      content={[{ item: <OverviewFormFinalLookTabContent handleTabChange={handleTabChange} index={index}/>}]}>
            </FormTabs>
        </OverviewFormLayout>
    )
}
