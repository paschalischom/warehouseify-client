import axios from 'axios';

function fetchGeodata() {
    return axios.get('/api/states');
}

function fetchQueryRanges() {
    return axios.get('/api/queryranges')
}

export const fetchUiData = () => {
    return (dispatch) => {
        Promise.all([fetchGeodata(), fetchQueryRanges()])
            .then((results) => {
                const statesData = results[0].data
                const queryRangesData = results[1].data
                dispatch({type: "STORE_STATES", data: statesData});
                dispatch({type: "STORE_QUERY_RANGES", data: queryRangesData});
            });
    }
}
