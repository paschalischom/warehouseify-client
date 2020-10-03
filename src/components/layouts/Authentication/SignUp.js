import React from "react";
import styled from "styled-components";
import {SignUpForm} from "./Forms";
import {SignUpAddendum} from "./Addendums";

const StyledContainer = styled.div`
    background-color: #1b1a1d;
    height: 100%;
    width: 100%;
`

const StyledSignUpContainer = styled.div`
    max-width: 750px;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
`

export default function SignUp() {

    return (
        <React.Fragment>
            <StyledContainer>
                <StyledSignUpContainer>
                    <SignUpAddendum />
                    <SignUpForm />
                </StyledSignUpContainer>
            </StyledContainer>
        </React.Fragment>
    )
}
