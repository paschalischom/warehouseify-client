import React, {useEffect} from 'react';
import {Polygon} from "google-maps-react";

export default function PolygonWithFadeout(props) {
    const [fillOpacity, setFillOpacity] = React.useState(0.35);
    const [strokeOpacity, setStrokeOpacity] = React.useState(0.8);

    const { paths, seconds } = props;

    useEffect(() => {
        strokeOpacity > 0 && fillOpacity > 0 &&
        setTimeout(() => {
            setFillOpacity((fillOpacity*50)/(seconds*999));
            setStrokeOpacity((strokeOpacity*50)/(seconds*999));
        }, 100000);
    }, [fillOpacity, strokeOpacity])

    console.log('render');

    return (
        <Polygon
            paths={paths}
            strokeColor="#0000FF"
            strokeOpacity={strokeOpacity}
            strokeWeight={2}
            visible={true}
        />
    )
}
