export const getCartReducer = (state = { cartData: {}, count:'' }, action) => {
    switch (action.type) {
        
        case 'ADDTO_CART_SUCCESS':
        case 'USER_CART_SUCCESS': 
        case 'REMOVE_ITEM_SUCCESS': 
        case 'DELETE_CART_SUCCESS': 
            return {
                ...state,
                cartData: action.payload
            }

        case 'ADDTO_CART_FAIL':
        case 'USER_CART_FAIL': 
        case 'REMOVE_ITEM__FAIL': 
        case 'DELETE_CART_FAIL': 
            return {
                ...state,
                error: action.payload
            }

        case 'CART_COUNT_SUCCESS': 
            return {
                ...state,
                count: action.payload
            }

        case 'CART_COUNT_FAIL':
            return {
                ...state,
                error: action.payload
            }


        default:
            return state;
    }
}
