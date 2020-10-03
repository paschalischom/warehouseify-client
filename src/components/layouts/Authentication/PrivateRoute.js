import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {isEmpty, isLoaded} from "react-redux-firebase";

function PrivateRoute({children, ...other}) {
    const { auth } = other;

    return (
        <Route
            {...other}
            render={({ location }) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);
