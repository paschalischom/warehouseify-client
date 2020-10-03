import React from 'react';
import styled from "styled-components";
import {Divider, Typography} from "@material-ui/core";
import {QCFormCustomizationTabContent} from "./FormTabContent";
import FormTabs from "../../reusable/FormTabs";
import NextStepButton from "../../reusable/NextStepButton";

const QueryCustomizationFormLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 1.1fr;
`

const QueryCustomizationFormHeader = styled.div`
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

export default function QueryCustomizationForm(props) {
    const {index, handleTabChange} = props;

    const onNextButtonClick = (event) => {
        handleTabChange(event, index + 1);
    }

    return (
        <QueryCustomizationFormLayout>
            <QueryCustomizationFormHeader>
                <div>
                    <Typography align={"left"} variant={"h5"} color={"primary"}>
                        Query Customization Form
                        <StyledDivider orientation={"vertical"} variant={"middle"}/>
                    </Typography>
                    <Typography variant={"body2"} color={"primary"}>
                        Customize the query by filtering the results with the desired attributes.
                        Please HIT THE STORE PREFERENCES BUTTON after changing a query input.
                    </Typography>
                </div>
                <NextStepButton onTabChangeRequest={(event) => onNextButtonClick(event)}/>
            </QueryCustomizationFormHeader>
            <FormTabs labels={[{ name: 'Customization' }]}
                      content={[{ item: <QCFormCustomizationTabContent />}]}>
            </FormTabs>
        </QueryCustomizationFormLayout>
    )
}
