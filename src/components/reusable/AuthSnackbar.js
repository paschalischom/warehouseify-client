import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {connect} from "react-redux";
import {isEmpty, isLoaded} from 'react-redux-firebase'
import CircularProgress from "@material-ui/core/CircularProgress";
import {Fab} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import {ReactComponent as LoginIcon} from "../../images/login.svg";
import ErrorIcon from '@material-ui/icons/Error';
import {blue, green, red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    authLoading: {
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    authSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    authFailure: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    fabProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }
}));

function AuthSnackbar(props) {
    const { authError, auth, authSnackbarStatus, closeSnackbar } = props;
    const classes = useStyles();
    /*
    * 'success' and 'authError' conditionals are mutually exclusive in the 'true' state.
    * Both can coincide in the 'false' state. That's when the authentication is loading.
    */
    const success = isLoaded(auth) && !isEmpty(auth);
    const buttonClassname = clsx({
        [classes.authSuccess]: success,
        [classes.authFailure]: authError,
        [classes.authLoading]: !success && !authError
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
    };

    return (
        <React.Fragment>
            <Snackbar open={authSnackbarStatus} autoHideDuration={4000} onClose={handleClose}>
                <div>
                    <Fab
                        aria-label="login"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleClose}>
                        {success ? <CheckIcon /> : authError ?
                            <ErrorIcon /> :
                            <LoginIcon />}
                    </Fab>
                    {!success && !authError && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </Snackbar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
        authSnackbarStatus: state.auth.authSnackbarStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeSnackbar: () => dispatch({type: 'AUTH_SNACKBAR_CLOSE'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSnackbar)
