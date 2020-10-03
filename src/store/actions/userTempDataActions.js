import axios from "axios";

export const searchAddress = (address) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: '/api/geocoding/forward',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: address
        }).then((response) => {
            let data = response.data;
            if (data['responseStatus'] === 'OK') {
                dispatch({type: 'ADD_TEMP_POI', data})
                dispatch({type: 'SHOW_SEARCH_RESULTS', showSearchResults: true})
                dispatch({type: 'ACTION_SNACKBAR', open: true}) // OK
                dispatch({type: 'ACTION_SUCCESS', message: 'Search was successful!'})
                dispatch({type: 'ACTION_ERROR', errorStatus: false, message: ''})
            } else {
                dispatch({type: 'ACTION_SNACKBAR', open: true}) // ZERO_RESULTS
                dispatch({type: 'ACTION_ERROR', errorStatus: true,
                    message: 'No Results were found for the given address.'})
            }
        }).catch(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true})
            dispatch({type: 'ACTION_ERROR', errorStatus: true,
                message: 'The search function encountered a 502 Gateway error.'})
        })
    }
}

export const closeActionSnackbar = () => {
    return (dispatch) => {
        dispatch({type: 'ACTION_SNACKBAR', open: false});
        dispatch({type: 'ACTION_ERROR', errorStatus: false, message: ''});
        dispatch({type: 'ACTION_SUCCESS', message: ''});
    }
}

export const updateQueryInputs = (queryInputs) => {
    return (dispatch) => {
        dispatch({type: 'ACTION_SNACKBAR', open: true});
        dispatch({type: 'UPDATE_QUERY_INPUTS', queryInputs});
        dispatch({type: 'ACTION_SUCCESS', message: 'Preferences updated!'});
    }
}

export const submitQuery = () => {
    return (dispatch, getState) => {
        dispatch({type: 'SET_SEARCHING_IN_PROGRESS', searchingInProgress: true});

        // I hate myself for this... I swear I'll fix it afterwards
        const queryInputs = getState().userTemp.queryInputs
        if (queryInputs.priceRangeFrom === '') {
            queryInputs.priceRangeFrom = 0;
        }
        if (queryInputs.priceRangeTo === '') {
            queryInputs.priceRangeTo = Number.MAX_SAFE_INTEGER;
        }
        queryInputs.priceRangeFrom = parseFloat(queryInputs.priceRangeFrom);
        queryInputs.priceRangeTo = parseFloat(queryInputs.priceRangeTo);
        if (queryInputs.priceRangeTo < queryInputs.priceRangeFrom) {
            let temp = queryInputs.priceRangeFrom;
            queryInputs.priceRangeFrom = queryInputs.priceRangeTo;
            queryInputs.priceRangeTo = temp;
        }

        queryInputs.state = queryInputs.state.toLowerCase();
        queryInputs.state = queryInputs.state.replace(/\s/g, '-');

        return axios({
            method: 'post',
            url: '/api/user/' + getState().firebase.auth.uid + '/warehouseify',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...queryInputs
            },
        }).then((response) => {
            dispatch({type: 'ADD_RESULTS', results: response.data});
            dispatch({type: 'SET_SEARCHING_IN_PROGRESS', searchingInProgress: false});
        }).catch((err) => {
            console.log(err);
        })
    }
}
