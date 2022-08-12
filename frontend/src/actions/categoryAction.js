import * as Constants from "../Constants";

export const getCategories = () => async (dispatch) => {
    try {
        var data = await Constants.GetAPI('getallcategory', null);
        dispatch({ 
            type: 'ALL_CATEGORY_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'ALL_CATEGORY_FAIL', 
            payload: error 
        })
    }
}

export const getCategoryData = (query) => async (dispatch) => {
    try {
        var data = await Constants.GetAPI(`getproductsbycategory?categories=${query}`, null);
        dispatch({ 
            type: 'ALL_CATEGORYPRO_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'ALL_CATEGORYPRO_FAIL', 
            payload: error 
        })
    }
}