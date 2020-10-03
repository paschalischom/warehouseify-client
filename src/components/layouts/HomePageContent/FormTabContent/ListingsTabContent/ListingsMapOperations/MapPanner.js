import React, {useEffect} from "react";

function getLatLng(google, lat, lng) {
    return new google.maps.LatLng(lat, lng)
}

function getBounds(google, results) {
    const bounds = new google.maps.LatLngBounds();
    Object.values(results).map((result) => (
        bounds.extend(getLatLng(google, result['latitude'], result['longitude']))
    ));
    return bounds
}

export default function MapPanner(props) {
    const { google, map, results, selectedRowIndex } = props;

    useEffect(() => {
        if (map && selectedRowIndex !== null) {
            map.panTo(getLatLng(google, results[selectedRowIndex]['latitude'], results[selectedRowIndex]['longitude']));
        }
    }, [google, map, results, selectedRowIndex]);

    useEffect(() => {
        if (map && results.length) {
            map.panToBounds(getBounds(google, results));
        }
    }, [google, map, results])

    return (
        <React.Fragment>
        </React.Fragment>
    )
}
