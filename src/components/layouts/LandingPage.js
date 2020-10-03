import React from "react";
import styled from "styled-components";
import {ReactComponent as Logo} from "../../images/logo5.svg";
import {Button, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const LandingPageLayout = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: #202020;
`

const StyledMainLogo = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

const StyledMainTitle = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
`

const StyledMainSlogan = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`

const StyledMainPortal = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

export default function LandingPage() {

    return (
        <React.Fragment>
            <LandingPageLayout>
                <StyledMainLogo>
                    <Logo style={{
                        width: '300px',
                        marginRight: '200px',
                        marginBottom: '100px'
                    }}/>
                </StyledMainLogo>
                <StyledMainTitle>
                    <Typography variant={"h2"} color={"primary"} align={"center"} gutterBottom>
                        Welcome to
                    </Typography>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Typography variant={"h2"} color={"primary"} align={"right"} display={"inline"}>
                            Warehouse
                        </Typography>
                        <Typography variant={"h2"} color={"secondary"} align={"right"} display={"inline"}>
                            ify
                        </Typography>
                        <Typography variant={"h2"} color={"primary"} align={"right"} display={"inline"}>
                            !
                        </Typography>
                    </div>
                </StyledMainTitle>
                <StyledMainSlogan>
                    <Typography variant={"h4"} color={"primary"} style={{
                        marginBottom: "10px",
                        marginRight: "30px"
                    }}>
                        Start searching now...
                    </Typography>
                    <Typography variant={"subtitle1"} color={"primary"}>
                        ...and access thousands of warehouse listings
                    </Typography>
                </StyledMainSlogan>
                <StyledMainPortal>
                    <Button color={"secondary"} size={"large"} variant={"outlined"} style={{marginTop: "90px"}}
                            component={NavLink} to={'/main'}
                    >
                        START
                    </Button>
                </StyledMainPortal>
            </LandingPageLayout>
        </React.Fragment>
    )
}
