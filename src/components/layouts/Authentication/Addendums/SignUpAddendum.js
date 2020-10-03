import React from 'react';
import styled from "styled-components";
import SocialMedia from "../../../reusable/SocialMedia";
import {SignUpSlogan} from "./Slogan";
import {ReactComponent as ReactLogo} from "../../../../images/logo5.svg";

const SignUpAddendumContainer = styled.div`
    flex: 1;
    margin: 25px 0px;
    background-color: #2e2e31;
    display: grid;
    grid-template-columns: ;
    grid-template-rows: 1.1fr 0.6fr 1.3fr;
`

const StyledSignUpSlogan = styled(SignUpSlogan)`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`

const SocialMediaContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
    display: flex;
`

export default function SignUpAddendum() {

    return (
        <React.Fragment>
            <SignUpAddendumContainer>
                <div>
                    <ReactLogo/>
                </div>
                <StyledSignUpSlogan />
                <SocialMediaContainer>
                    <SocialMedia style={{
                        margin: 'auto',

                    }}/>
                </SocialMediaContainer>
            </SignUpAddendumContainer>
        </React.Fragment>
    )
}
