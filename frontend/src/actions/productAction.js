import * as Constants from "../Constants";

export const getProducts = () => async (dispatch) => {
    try {
        var data = await Constants.GetAPI('getallproduct', null);
        dispatch({ 
            type: 'ALL_PRODUCTS_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'ALL_PRODUCTS_FAIL', 
            payload: error 
        })
    }
}

export const getProductDetail = (id) => async (dispatch) => {
    try {
        var data = await Constants.GetAPI(`getsingleproduct/${id}`, null);
        dispatch({ 
            type: 'SINGLE_PRODUCT_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'SINGLE_PRODUCT_FAIL', 
            payload: error 
        })
    }
}

export const getSearchData = (query) => async (dispatch) => {
    try {
        var data = await Constants.GetAPI(`search?name=${query}`, null);
        dispatch({ 
            type: 'ALL_SEARCH_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'ALL_SEARCH_FAIL', 
            payload: error 
        })
    }
}