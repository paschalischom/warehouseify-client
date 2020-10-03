import React from "react";
import styled from "styled-components";
import {Typography, Button, Link} from "@material-ui/core";
import { useForm } from "react-hook-form";
import CustomTextField from "../../../reusable/CustomTextField";
import Copyright from "../../../reusable/Copyright";
import { connect } from "react-redux";
import { signUp } from "../../../../store/actions/authActions";

const SignUpFormContainer = styled.div`
    flex: 1;
    margin: 25px 25px 25px 0px;
    background-color: #2e2e31;
    display: grid;
    grid-template-columns: ;
    grid-template-rows: 0.25fr 1fr;
`

const StyledSignUpHeader = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    white-space: nowrap;
    margin: auto;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 34px;
`

const StyledAuthStatus = styled.div`
    height: 20px;
    margin-top: 20px;
`

const StyledTypography = styled(Typography)`
    border-bottom: 1px solid #909090;
    display: inline-block;
`

function SignUpForm(props) {
    const { register, handleSubmit } = useForm();
    const preventDefault = (event) => event.preventDefault();
    const { signUp, authError } = props;

    const onSubmit = data => {
        console.log(data);
        signUp(data);
    };


    return (
        <React.Fragment>
            <SignUpFormContainer>
                <StyledSignUpHeader>
                    <StyledTypography color={'primary'} align={'right'} variant={"h4"} noWrap={true}>
                        Join Warehouse
                    </StyledTypography>
                    <StyledTypography color={'secondary'} align={'left'} variant={"h4"} noWrap={true}>
                        ify
                    </StyledTypography>
                </StyledSignUpHeader>
                <StyledForm onSubmit={handleSubmit(onSubmit)} autocomplete={"off"}>
                    <CustomTextField
                        id={'firstName'}
                        name={'firstName'}
                        label={'First Name'}
                        type={'text'}
                        inputRef={register}
                        required
                    />
                    <CustomTextField
                        id={'lastName'}
                        name={'lastName'}
                        label={'Last Name'}
                        type={'text'}
                        inputRef={register}
                        required
                    />
                    <CustomTextField
                        id={'email'}
                        name={'email'}
                        label={'Email'}
                        type={'email'}
                        inputRef={register}
                        required
                    />
                    <CustomTextField
                        id={'password'}
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                        inputRef={register}
                        required
                    />
                    <StyledAuthStatus>
                        { authError ?
                            <Typography color={"primary"} variant={"caption"}>{authError}</Typography> :
                            null
                        }
                    </StyledAuthStatus>
                    <Button
                        type={'submit'}
                        color={'secondary'}
                        fullWidth
                        style={{
                            margin: "20px 0px 50px 0px",
                        }}
                    >
                        Sign Up
                    </Button>
                    <Typography color={"primary"} variant={"caption"}>
                        By clicking 'Sign Up', you agree to the
                        <Link href={"#"} onClick={preventDefault} color={"secondary"}>
                            {' Terms of Use'}
                        </Link>
                        .
                    </Typography>
                </StyledForm>
                <Copyright text={"2020, Paschalis Chomondozlis, All Rights Forfeited :)"} />
            </SignUpFormContainer>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
