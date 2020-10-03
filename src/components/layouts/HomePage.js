import React, { useEffect } from "react";
import { NavigationTabs } from './HomePageContent';
import '../../styles/HomePage.css';
import { connect } from 'react-redux';
import { fetchUiData } from "../../store/actions/uiDataActions";
import AppSnackbars from "../reusable/AppSnackbars";

function HomePage(props) {

    /* TODO: Implement a more robust async initial state loader for redux. */
    const { fetchUiData } = props;

    useEffect(() => {
        fetchUiData();
    }, [fetchUiData]);


    return (
        <React.Fragment>
            <NavigationTabs />
            <AppSnackbars />
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUiData: () => dispatch(fetchUiData())
    }
}

export default connect(null, mapDispatchToProps)(HomePage);
