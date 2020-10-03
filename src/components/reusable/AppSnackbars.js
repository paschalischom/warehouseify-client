import React  from 'react';
import { connect } from 'react-redux';
import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {closeActionSnackbar} from "../../store/actions/userTempDataActions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AppSnackbars(props) {
    const { actionSnackbarOpen,...errorInfo } = props;
    const { actionErrorStatus, ...actions } = errorInfo;
    const { closeActionSnackbar, ...messages } = actions;
    const { actionErrorMessage, actionSuccessMessage } = messages;

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Adhering to https://material-ui.com/components/snackbars/#consecutive-snackbars
        closeActionSnackbar();
    };

    return (
        <React.Fragment>
            <Snackbar
                open={actionSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={handleSnackbarClose} severity={actionErrorStatus ? "error" : "success"}>
                    {actionErrorStatus
                        ? actionErrorMessage
                        : actionSuccessMessage
                    }
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        actionSnackbarOpen: state.userTemp.actionSnackbarOpen,
        actionErrorStatus: state.userTemp.actionErrorStatus,
        actionErrorMessage: state.userTemp.actionErrorMessage,
        actionSuccessMessage: state.userTemp.actionSuccessMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeActionSnackbar: () => dispatch (closeActionSnackbar()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbars);
