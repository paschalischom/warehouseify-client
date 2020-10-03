import React from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import warehouse from '../../../../../icons/warehouse_icon.png';
import warehouseColored from '../../../../../icons/warehouse_icon_colored.png';
import {MapPanner} from "./ListingsMapOperations";

function ListingsMap(props) {
    const { google, results, selectedRowIndex } = props;

    const warehouseIcon = {
        url: warehouse, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    const warehouseColoredIcon = {
        url: warehouseColored, // url
        scaledSize: new google.maps.Size(35, 35), // scaled size
    };

    return (
        <React.Fragment>
            <Map
                google={google}
                initialCenter={{
                    lat: 39.5,
                    lng: -98.35
                }}
                zoom={4}
            >
                {Object.values(results).map((result, index) => (
                    <Marker key={result['id']}
                            position={{lat: result['latitude'], lng: result['longitude']}}
                            icon={selectedRowIndex === index ? warehouseColoredIcon : warehouseIcon}
                    />
                ))}
                <MapPanner results={results} selectedRowIndex={selectedRowIndex}/>
            </Map>
        </React.Fragment>
    )
}

export default (GoogleApiWrapper({
    apiKey: '<GOOGLE_MAPS_API_KEY>'
})(ListingsMap));
