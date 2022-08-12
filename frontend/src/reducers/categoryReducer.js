export const getCategoryReducer = (state = { categories: [], catProducts: [] }, action) => {
    switch (action.type) {
        
        case 'ALL_CATEGORY_SUCCESS':
            return {
                ...state,
                categories: action.payload,
                loading: false
            }

        case 'ALL_CATEGORY_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'ALL_CATEGORYPRO_SUCCESS':
            return {
                ...state,
                catProducts: action.payload,
                loading: false
            }

        case 'ALL_CATEGORYPRO_FAIL':
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}
