import React from "react";
import styled from "styled-components";
import {IconButton} from '@material-ui/core';
import {useForm} from "react-hook-form";
import CustomTextField from "../../../../../../reusable/CustomTextField";
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import {searchAddress} from "../../../../../../../store/actions/userTempDataActions";

const StyledField = styled(CustomTextField)`
    margin: 0px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    background-color: #1b1a1d;
    border: 2px solid #ffffff38;
`

function AddressInputForm(props) {
    const { register, handleSubmit } = useForm();
    const { searchAddress } = props;

    const onSubmit = data => {
        searchAddress(data);
    }

    return (
        <React.Fragment>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledField
                    id={'address'}
                    name={'address'}
                    label={'Address'}
                    type={'text'}
                    inputRef={register}
                    margin={"none"}
                />
                <IconButton color={"secondary"} type={"submit"}>
                    <SearchIcon />
                </IconButton>
            </StyledForm>
        </React.Fragment>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchAddress: (address) => dispatch(searchAddress(address))
    }
}

export default connect(null, mapDispatchToProps)(AddressInputForm);
