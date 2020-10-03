import axios from "axios";

export const createAndAddPoi = (location) => {
    return (dispatch, getState) => {
        return axios({
            method: 'post',
            url: '/api/user/' + getState().firebase.auth.uid + '/poi/createandadd',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                latitude: location.lat(),
                longitude: location.lng(),
            },
        }).then(( response ) => {
            let data = response.data;
            dispatch({type: 'ADD_POI', newPoi: data});

            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_SUCCESS', message: 'Point of Interest added!'});
        }).catch(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_ERROR', errorStatus: true, message: 'The server encountered an error.'});
        })
    }
}

export const addTempPoi = (poi) => {
    return (dispatch, getState) => {
        return axios({
            method: 'post',
            url: '/api/user/' + getState().firebase.auth.uid + '/poi/add',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: poi,
        }).then(( response ) => {
            let data = response.data;
            dispatch({type: 'ADD_POI', newPoi: data});

            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_SUCCESS', message: 'Point of Interest added!'});
        }).catch(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_ERROR', errorStatus: true, message: 'The server encountered an error.'});
        })
    }
}

export const deletePoi = (poiUID) => {
    return (dispatch, getState) => {
        let rollbackPoi = {...getState().user.poiList[poiUID]}

        dispatch({type: 'DELETE_POI', poiUID})

        return axios({
            method: 'get',
            url: '/api/user/' + getState().firebase.auth.uid + '/poi/' + poiUID + '/delete',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_SUCCESS', message: 'Point of Interest deleted!'});
        }).catch(() => {
            dispatch({type: 'ROLLBACK_POI', poiUID, rollbackPoi: rollbackPoi});
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_ERROR', errorStatus: true, message: 'Deletion unsuccessful. Rollback completed.'});
        })
    }
}

export const deletePoiBatch = (selectedRows) => {
    return (dispatch, getState) => {
        let rollbackPoiList = {}
        selectedRows.map((poiUID) => (
            rollbackPoiList[poiUID] = getState().user.poiList[poiUID]
        ))

        dispatch({type: 'BATCH_DELETE_POI', selectedRows});

        return axios({
            method: 'post',
            url: '/api/user/' + getState().firebase.auth.uid + '/poi/batch/delete',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: selectedRows
        }).then(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_SUCCESS', message: 'Delete successful!'});
        }).catch(() => {
            dispatch({type: 'ROLLBACK_POI_BATCH', rollbackPoiList});
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_ERROR', errorStatus: true, message: 'Delete unsuccessful. Rollback completed.'});
        })
    }
}

export const editPoi = (poiUID, newPoi) => {
    return (dispatch, getState) => {
        let rollbackPoi = {...getState().user.poiList[poiUID]}
        console.log(newPoi);

        dispatch({type: 'EDIT_POI', poiUID, newPoi: newPoi})

        return axios({
            method: 'post',
            url: '/api/user/' + getState().firebase.auth.uid + '/poi/' + poiUID + '/edit',
            timeout: 0,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...newPoi
            },

        }).then(() => {
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_SUCCESS', message: 'Edit successful!'});
        }).catch((err) => {
            dispatch({type: 'ROLLBACK_POI', poiUID, rollbackPoi: rollbackPoi});
            dispatch({type: 'ACTION_SNACKBAR', open: true});
            dispatch({type: 'ACTION_ERROR', errorStatus: true, message: 'Edit unsuccessful. Rollback completed.'});
        })
    }
}
