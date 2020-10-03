import React  from 'react';
import {MapToolbar, MapContainer, SearchResultContainer} from "./MapWithToolbarContent";
import {createAndAddPoi} from "../../../../../store/actions/userDataActions";
import {connect} from "react-redux";

function MapWithToolbarContainer(props) {
    const { createAndAddPoi } = props;
    const [mapFocusStateIndex, setMapFocusStateIndex] = React.useState(17);
    const [drawMarkers, setDrawMarkers] = React.useState(false);


    const toggleDrawMarkers = (newState) => {
        setDrawMarkers(newState);
    }

    const onPoiAddRequest = (event, latlng) => {
        if (drawMarkers) {
            createAndAddPoi(latlng);
        }
    }

    return (
        <React.Fragment>
            <MapContainer mapFocusStateIndex={mapFocusStateIndex} onPoiAddRequest={onPoiAddRequest} />
            <MapToolbar onToolbarStateChange={setMapFocusStateIndex} toggleDrawMarkers={toggleDrawMarkers} />
            <SearchResultContainer isOpen={true}/>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAndAddPoi: (location) => dispatch(createAndAddPoi(location))
    }
}

export default connect(null, mapDispatchToProps)(MapWithToolbarContainer);
