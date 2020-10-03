import React from "react";
import styled from "styled-components";
import { LoginForm } from "./Forms";

const StyledContainer = styled.div`
    background-color: #1b1a1d;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export default function Login() {
    return (
        <React.Fragment>
            <StyledContainer>
                <LoginForm />
            </StyledContainer>
        </React.Fragment>
    )
}
