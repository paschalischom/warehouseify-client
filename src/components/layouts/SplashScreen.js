import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../reusable/LoadingSpinner";

const SplashScreenWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #2e2e31;
    position: absolute;
`

export default function SplashScreen() {
    return (
        <SplashScreenWrapper>
            <LoadingSpinner />
        </SplashScreenWrapper>
    )
}

