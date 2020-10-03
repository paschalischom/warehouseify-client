import React from "react";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

export default function LoggedOutLinks() {

    return (
        <React.Fragment>
            <Button color={'primary'} component={NavLink} to={'/login'}>
                Login
            </Button>
            <Button color={'primary'} component={NavLink} to={'/signup'}>
                Sign Up
            </Button>
        </React.Fragment>
    )
}
