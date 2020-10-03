const initState = {
    tempPoi: {
        address: '',    // Way to avoid null pointer exception in SearchResultContainer
        state: '',      // and maintain a beautiful closing animation that a conditional
        lat: '',        // render wouldn't allow us to do. This will sound complete nonsense
        lng: ''         // to someone reading it and I'm sorry, I had to write it for internal peace.
    },
    actionSnackbarOpen: false,
    actionSuccessMessage: '',
    actionErrorStatus: false,
    actionErrorMessage: '',
    showSearchResults: false,
    queryInputs: {
        buildingClass: "",
        priceRangeFrom: "",
        priceRangeTo: "",
        propertyType: "",
        state: "",
        status: "",
        buildingClassCheckbox: false,
        propertyTypeCheckbox: false
    },
    searchingInProgress: false,
    results: []
}

const userTempDataReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_TEMP_POI':
            return {
                ...state,
                tempPoi: action.data
            }
        case 'ACTION_SNACKBAR':
            return {
                ...state,
                actionSnackbarOpen: action.open
            }
        case 'ACTION_ERROR':
            // Two different actions needed in order to maintain
            // errorStatus and errorMessage when opening and closing the snackbar
            return {
                ...state,
                actionErrorStatus: action.errorStatus,
                actionErrorMessage: action.message
            }
        case 'ACTION_SUCCESS':
            return {
                ...state,
                actionSuccessMessage: action.message
            }
        case 'SHOW_SEARCH_RESULTS':
            return {
                ...state,
                showSearchResults: action.showSearchResults
            }
        case 'UPDATE_QUERY_INPUTS':
            return {
                ...state,
                queryInputs: action.queryInputs
            }
        case 'SET_SEARCHING_IN_PROGRESS':
            return {
                ...state,
                searchingInProgress: action.searchingInProgress
            }
        case 'ADD_RESULTS':
            return {
                ...state,
                results: action.results
            }
        default:
            return state
    }
}

export default userTempDataReducer;
