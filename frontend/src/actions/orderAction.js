import * as Constants from "../Constants";
import {val} from '../Reusable';

export const getOrders = () => async (dispatch) => {
    try {
        var data = await Constants.GetAPI(`getallorderuser/${val}`, null);
        dispatch({ 
            type: 'ALL_ORDER_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'ALL_ORDER_FAIL', 
            payload: error 
        })
    }
}

export const placeOrder = (payloadData) => async (dispatch) => {
    try {
        var data = await Constants.PostAPI(`addorder`, payloadData);
        dispatch({ 
            type: 'PLACE_ORDER_SUCCESS', 
            payload: data 
        })
    } catch (error) {
        dispatch({ 
            type: 'PLACE_ORDER_FAIL', 
            payload: error 
        })
    }
}