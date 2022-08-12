export const getProductsReducer = (state = { products: [], single:{} }, action) => {
    switch (action.type) {
        
        case 'ALL_SEARCH_SUCCESS':
        case 'ALL_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: action.payload,
                loading: false
            }

        case 'SINGLE_PRODUCT_SUCCESS':
            return {
                ...state,
                single: action.payload,
                loading: false
            }
        
        case 'ALL_SEARCH_FAIL':    
        case 'ALL_PRODUCTS_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'SINGLE_PRODUCT_FAIL':
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
