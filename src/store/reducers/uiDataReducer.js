const initState = {
    usrStateSelection: 'All States',
    states: {},
    queryRanges: {
        buildingClasses: [],
        statuses: {
            forLease: {
                priceHigh: 0,
                priceLow: 0
            },
            forSale: {
                priceHigh: 0,
                priceLow: 0
            }
        },
        subTypes: [],
        buildingSizes: {
            buildingSizeHigh: 0,
            buildingSizeLow: 0
        }
    }
}

const uiDataReducer = (state = initState, action) => {
    switch (action.type) {
        case "STORE_STATES":
            return {
                ...state,
                states: action.data
            }
        case "STORE_QUERY_RANGES":
            return {
                ...state,
                queryRanges: action.data
            }
        default:
            return state
    }
}

export default uiDataReducer;
