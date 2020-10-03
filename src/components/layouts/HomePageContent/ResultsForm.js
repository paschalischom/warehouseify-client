import React from 'react';
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import FormTabs from "../../reusable/FormTabs";
import { ResultsFormListingsTabContent } from "./FormTabContent";

const ResultsFormLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.1fr;
`

const ResultTabHeader = styled.div`
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

export default function ResultsForm() {
    return (
        <ResultsFormLayout>
            <ResultTabHeader>
                <div>
                    <Typography align={"left"} variant={"h5"} color={"primary"}>
                        Results
                    </Typography>
                    <Typography variant={"body2"} color={"primary"}>
                        View the results returned after querying our database!
                    </Typography>
                </div>
            </ResultTabHeader>
            <FormTabs labels={[{ name: 'Listings' }]}
                      content={[{ item: <ResultsFormListingsTabContent />}]}>
            </FormTabs>
        </ResultsFormLayout>
    )
}
