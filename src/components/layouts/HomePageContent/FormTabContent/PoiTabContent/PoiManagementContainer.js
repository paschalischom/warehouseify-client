import React from 'react';
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import CustomAutocomplete from "../../../../reusable/CustomAutocomplete";

const ContentWrapper = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: #2e2e31;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin: 0px 10px;
    min-width: 50px;
    height: 100%;
`

const StyledAutocomplete = styled(CustomAutocomplete)`
    margin-right: 35px;
`

function PoiManagementContainer(props) {
    const { register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);

    const { states } = props;
    const statuses = [{'type':'Active'},{'type': 'Disabled'}];

    const renderOption_States = (option) => (
        <React.Fragment>
            {option.name}, {option.abbreviation}
        </React.Fragment>
    )

    const getOptionLabel_States = (option) => `${option.name}, ${option.abbreviation}`

    const renderOption_Statuses = (option) => (
        <React.Fragment>
            {option.type}
        </React.Fragment>
    )

    const getOptionLabel_Statuses = (option) => `${option.type}`

    return (
        <React.Fragment>
            <ContentWrapper>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <StyledAutocomplete
                        id={"state-select"}
                        options={states}
                        label={"Filter by state"}
                        renderOption={renderOption_States}
                        getOptionLabel={getOptionLabel_States}
                    />
                    <StyledAutocomplete
                        id={"status-select"}
                        options={statuses}
                        label={"Filter by status"}
                        renderOption={renderOption_Statuses}
                        getOptionLabel={getOptionLabel_Statuses}
                    />
                </StyledForm>
            </ContentWrapper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        states: state.ui.states
    }
}

export default connect(mapStateToProps)(PoiManagementContainer);
