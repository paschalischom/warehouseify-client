import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {isEmpty, isLoaded} from "react-redux-firebase";

/* Basically the complete opposite of PrivateRoute but only accessible by those who are not authenticated.
 * We try to avoid the pitfall of someone entering the '/signup' or '/login' URI directly while
 * authenticated. That's a no no...
 */
function PrivateRoute({children, ...other}) {
    const { auth } = other;

    return (
        <Route
            {...other}
            render={({ location }) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                ) : (
                    children
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
