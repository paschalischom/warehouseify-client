import React from 'react';
import { connect } from "react-redux";
import { isLoaded } from 'react-redux-firebase'
import {SplashScreen} from "../../layouts";


function AuthIsLoaded({children, ...other}) {
    const { auth } = other;

    if (!isLoaded(auth))
        return (
            <SplashScreen />
        );

    return children;
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(AuthIsLoaded);
