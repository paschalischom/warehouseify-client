import React from "react";
import styled from "styled-components";
import {Button, Link, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import CustomTextField from "../../../reusable/CustomTextField";
import Copyright from "../../../reusable/Copyright";
import { connect } from "react-redux";
import { logIn } from "../../../../store/actions/authActions";

const LoginFormContainer = styled.div`
    background-color: #2e2e31;
    width: 500px;
    height: 400px;
    display: grid;
    grid-template-columns: ;
    grid-template-rows: 0.5fr 1.4fr;
    justify-content: center;
    align-items: center;
`

const StyledLoginHeader = styled.div`
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
`

const StyledTypography = styled(Typography)`
    border-bottom: 1px solid #909090;
    display: inline-block;
`

function LoginForm({className, ...other}) {
    const { register, handleSubmit } = useForm();
    const preventDefault = (event) => event.preventDefault();
    const { logIn, authError } = other;

    const onSubmit = data => {
        console.log(data);
        logIn({
            email: data.email,
            password: data.password
        });
    };

    return (
        <React.Fragment>
            <LoginFormContainer className={className}>
                <StyledLoginHeader>
                    <StyledTypography color={'primary'} align={'right'} variant={"h4"} noWrap={true}>
                        Login to Warehouse
                    </StyledTypography>
                    <StyledTypography color={'secondary'} align={'left'} variant={"h4"} noWrap={true}>
                        ify
                    </StyledTypography>
                </StyledLoginHeader>
                <StyledForm onSubmit={handleSubmit(onSubmit)} autocomplete={"off"}>
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
                    <Button
                        type={'submit'}
                        color={'secondary'}
                        fullWidth
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        Login
                    </Button>
                    <StyledAuthStatus>
                        { authError ?
                            <Typography color={"primary"} variant={"caption"} align={"center"}>{authError}</Typography> :
                            null
                        }
                    </StyledAuthStatus>
                    <div>
                        <Typography color={"primary"} variant={"caption"} style={{
                            display: 'inline-block',
                            margin: '15px',
                        }}>
                            <Link href={"#"} onClick={preventDefault}>
                                {'Forgot password?'}
                            </Link>
                        </Typography>
                        <Typography color={"primary"} variant={"caption"} style={{
                            display: 'inline-block',
                            margin: '15px',
                        }}>
                            <Link href={"#"} onClick={preventDefault}>
                                {'Don\'t have an account?'}
                            </Link>
                        </Typography>
                    </div>
                </StyledForm>
                <Copyright text={"2020, Paschalis Chomondozlis, All Rights Forfeited :)"} />
            </LoginFormContainer>
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
        logIn: (credentials) => dispatch(logIn(credentials)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
