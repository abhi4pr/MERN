export const getOrderReducer = (state = { orders: [], newOrder:{} }, action) => {
    switch (action.type) {
        
        case 'ALL_ORDER_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                loading: false
            }

        case 'ALL_ORDER_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'PLACE_ORDER_SUCCESS':
            return {
                ...state,
                newOrder: action.payload,
                loading: false
            }

        case 'PLACE_ORDER_FAIL':
            return {
                ...state,
                error: action.payload
            }    

        default:
            return state;
    }
}
