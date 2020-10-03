import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";
import {LoggedInLinks, LoggedOutLinks} from "./HeaderLinks";
import { ReactComponent as Logo } from "../../images/logo5.svg";
import CsUoiLogo from '../../images/csuoi_logo.png';
import { connect } from 'react-redux';
import {IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";

const StyledLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    white-space: nowrap;
`

const StyledIconButton = styled(IconButton)`
    &.MuiIconButton-root {
        padding: 6px;
        border-radius: 0;
        
        &:hover {
            border: 1px solid black;
            background-color: #dc6d439e;
        }
    }
`

function Header(props) {
    const {auth, profile} = props;

    const authLinksConditional = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
        <React.Fragment>
            <AppBar position={'static'} style={{ backgroundColor: '#303033',}}>
                <Toolbar>
                    <Grid container spacing={5} direction={'row'} alignItems={'center'} justify={'center'} wrap={"nowrap"}>
                        <Grid item sm>
                            <Button
                                variant="contained"
                                color="inherit"
                                startIcon={<Avatar src={CsUoiLogo} />}
                                style={{backgroundColor: "#857f7f"}}
                                href={"https://www.cs.uoi.gr/"}
                            >
                                Cs UoI
                            </Button>
                        </Grid>
                        <Grid item sm={8} style={{display: "flex"}}>
                            <StyledIconButton style={{margin: "auto"}} component={NavLink} to={'/'}>
                                <Logo style={{width: "70px"}}/>
                            </StyledIconButton>
                        </Grid>
                        <Grid item sm>
                            <StyledLinkContainer>
                                {auth.isLoaded ? authLinksConditional :
                                    <CircularProgress color={"secondary"}/>}
                            </StyledLinkContainer>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Header);
