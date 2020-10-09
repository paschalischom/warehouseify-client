import React from "react";
import styled from "styled-components";
import {Divider, Typography} from "@material-ui/core";
import NextStepButton from "../../reusable/NextStepButton";
import MemoizedQRFormRankingTabContent from "./FormTabContent/QRFormRankingTabContent"
import FormTabs from "../../reusable/FormTabs";

const QueryRankingFormLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.1fr;
`

const QueryRankingFormHeader = styled.div`
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

const StyledDivider = styled(Divider)`
    &.MuiDivider-root {
        background-color: #dc6d439e;
        height: 80%;
    }
`

export default function QueryRankingForm(props) {
    const {index, handleTabChange} = props;

    const onNextButtonClick = (event) => {
        handleTabChange(event, index + 1);
    }

    return (
        <QueryRankingFormLayout>
            <QueryRankingFormHeader>
                <div>
                    <Typography align={"left"} variant={"h5"} color={"primary"}>
                        Query Ranking Form
                        <StyledDivider orientation={"vertical"} variant={"middle"}/>
                    </Typography>
                    <Typography variant={"body2"} color={"primary"}>
                        Customize the ranking of the results. Adjust biases according to your preferences
                        and view the results sorted based on your own formula!
                    </Typography>
                </div>
                <NextStepButton onTabChangeRequest={(event) => onNextButtonClick(event)}/>
            </QueryRankingFormHeader>
            <FormTabs labels={[{ name: 'Customization' }]}
                      content={[{ item: <MemoizedQRFormRankingTabContent />}]}>
            </FormTabs>
        </QueryRankingFormLayout>
    )
}
