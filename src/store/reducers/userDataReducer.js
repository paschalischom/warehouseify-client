const initState = {
    profile: null,
    poiList: {}
}

const userDataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_POI':
            return {
                ...state,
                poiList: {...state.poiList, ...action.newPoi}
            }
        case 'DELETE_POI':
            let {[action.poiUID]: poi, ...restPoiList} = state.poiList
            return {
                ...state,
                poiList: restPoiList
            }
        case 'BATCH_DELETE_POI':
            const filteredPoiList = Object.keys(state.poiList)
                .filter(key => !(action.selectedRows.includes(key)))
                .reduce((obj, key) => {
                    obj[key] = state.poiList[key];
                    return obj;
                }, {});
            return {
                ...state,
                poiList: {...filteredPoiList}
            }
        case 'EDIT_POI':
            return {
                ...state,
                poiList: {
                    ...state.poiList,
                    [action.poiUID]: action.newPoi
                }
            }
        case 'ROLLBACK_POI': // While the same functionality with the EDIT_POI case, it's present for better readability and clarity
            return {
                ...state,
                poiList: {
                    ...state.poiList,
                    [action.poiUID]: action.rollbackPoi
                }
            }
        case 'ROLLBACK_POI_BATCH':
            return {
                ...state,
                poiList: {
                    ...action.rollbackPoiList,
                    ...state.poiList
                }
            }
        case 'LOAD_USER_PROFILE':
            return {
                ...state,
                profile: {
                    email: action.userInfo.email,
                    firstName: action.userInfo.firstName,
                    lastName: action.userInfo.lastName,
                    fullName: action.userInfo.fullName,
                    initials: action.userInfo.initials
                },
                poiList: action.poiList
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                profile: null,
                poiList: {}
            }
        default:
            return state
    }
}

export default userDataReducer;
