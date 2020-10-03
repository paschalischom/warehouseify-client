import React from "react";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import { logOut } from "../../../store/actions/authActions";
import {Avatar} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoggedInLinks(props) {
    const { profile, logOut } = props;

    const handleLogOutButtonClick = () => {
        logOut();
    }

    return (
        <React.Fragment>
            <Button color={'primary'} endIcon={<ExitToAppIcon/>} onClick={handleLogOutButtonClick}>
                Log out
            </Button>
            <Avatar>
                {profile ? profile.initials : <CircularProgress color={"secondary"} />}
            </Avatar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.user.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);
