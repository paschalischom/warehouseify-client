import React, {useLayoutEffect, useRef, useState} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Polyline, Circle} from 'google-maps-react';
import { connect } from "react-redux";
import {MarkerInfoWindow} from "./MapOperations";
import addressSearchResult from '../../../../../../icons/address_search_result_icon.png';
import disabledPoi from '../../../../../../icons/disabled_poi_icon.png';
import activePoi from '../../../../../../icons/active_poi_icon.png';

function MapContainer(props) {

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const [activeMarkerInfo, setActiveMarkerInfo] = useState({});
    const [viewportBounds, setViewportBounds] = useState({});
    const [polygonPoints, setPolygonPoints] = useState([]);
    const [markerZoom, setMarkerZoom] = useState(5);

    const { onPoiAddRequest, google, mapFocusStateIndex, ...reduxProps} = props;
    const { poiList, states, tempPoi, showSearchResults } = reduxProps;

    // Consumes the first render => simulates componentDidUpdate
    const firstUpdateStates = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdateStates.current) {
            firstUpdateStates.current = false;
            return;
        }

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(states[mapFocusStateIndex].viewport.southwest.latitude, states[mapFocusStateIndex].viewport.southwest.longitude));
        bounds.extend(new google.maps.LatLng(states[mapFocusStateIndex].viewport.northeast.latitude, states[mapFocusStateIndex].viewport.northeast.longitude));

        const formattedBoundingPolygon = states[mapFocusStateIndex].boundingPolygon.map((geocords) => {
            return (
                {'lat': geocords.latitude, 'lng': geocords.longitude}
            )
        });

        setPolygonPoints(formattedBoundingPolygon);
        setViewportBounds(bounds);
    }, [mapFocusStateIndex]);

    const firstUpdateSearch = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdateSearch.current) {
            firstUpdateSearch.current = false;
            return;
        }

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(tempPoi.viewport.southwest.latitude, tempPoi.viewport.southwest.longitude));
        bounds.extend(new google.maps.LatLng(tempPoi.viewport.northeast.latitude, tempPoi.viewport.northeast.longitude))

        setViewportBounds(bounds);
    }, [tempPoi]);

    const handleMapClick = (ref, map, event) => {
        const latlng = event.latLng;
        onPoiAddRequest(event, latlng);

        if (setInfoWindowOpen) {
            handleInfoWindowClose();
        }
    };

    const handleMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
        setActiveMarkerInfo(props.poiInfo);
        setInfoWindowOpen(true);
    };

    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false);
        setActiveMarker(null);
        setActiveMarkerInfo({});
    };

    const searchResultIcon = {
        url: addressSearchResult, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    const disabledPoiIcon = {
        url: disabledPoi, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    const activePoiIcon = {
        url: activePoi, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    return (
        <Map
            google={google}
            onClick={handleMapClick}
            bounds={viewportBounds}
            zoom={markerZoom}
        >
            <Polyline
                path={polygonPoints}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
            />
            {Object.keys(poiList).map((poiUID) => (
                <Marker key={poiUID}
                        position={poiList[poiUID]}
                        onClick={handleMarkerClick}
                        poiInfo={poiList[poiUID]}
                        icon={poiList[poiUID]['status'] === 'Disabled' ? disabledPoiIcon : activePoiIcon}
                />
            ))}
            {activeMarker !== null &&
                <Circle
                    radius={activeMarker ? activeMarkerInfo.radius : null}
                    center={new google.maps.LatLng(activeMarker.position.lat(), activeMarker.position.lng())}
                    strokeColor='#db460e'
                    strokeOpacity={0.3}
                    strokeWeight={5}
                    fillColor='#2e2e31'
                    fillOpacity={0.2}
                    visible={infoWindowOpen}
                />
            }
            <InfoWindow
                marker={activeMarker}
                visible={infoWindowOpen}
                onClose={handleInfoWindowClose}
            >
                <MarkerInfoWindow
                    markerInfo={activeMarkerInfo}
                    visible={infoWindowOpen}
                />
            </InfoWindow>
            {showSearchResults &&
                <Marker key={'tempPoi'}
                        position={tempPoi}
                        onClick={handleMarkerClick}
                        poiInfo={tempPoi}
                        icon={searchResultIcon}
                />
            }
        </Map>
    );
}

const mapStateToProps = (state) => {
    return {
        poiList: state.user.poiList,
        states: state.ui.states,
        tempPoi: state.userTemp.tempPoi,
        showSearchResults: state.userTemp.showSearchResults
    }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
    apiKey: '<GOOGLE_MAPS_API_KEY>'
})(MapContainer));
