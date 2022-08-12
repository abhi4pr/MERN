import * as Constants from "../Constants";
import {val} from '../Reusable';

export const addToCart = (payLoadData) => async (dispatch) => {
    try{
        return await Constants.PostAPI(`addcart`, payLoadData)
        .then((res)=>{
            dispatch({
                type: 'ADDTO_CART_SUCCESS',
                payload: res
            })
            return res
        })
        .catch((err)=>{
            return err
        })
    } catch(error){
        dispatch({
            type: 'ADDTO_CART_FAIL',
            payload: error
        })
    }
}

export const getUserCart = () => async (dispatch) => {
    try{
        var data = await Constants.GetAPI(`getusercart/${val}`, null);
        dispatch({
            type: 'USER_CART_SUCCESS',
            payload: data
        })
    }catch (error) {
        dispatch({
            type: 'USER_CART_FAIL',
            payload: error
        })
    }
}

export const removeCartItem = (id,payLoadData) => async (dispatch) => {
    try{
        var data = await Constants.PostAPI(`removecartitem/${id}`, payLoadData);
        dispatch({
            type: 'REMOVE_ITEM_SUCCESS',
            payload: data
        })
    }catch (error) {
        dispatch({
            type: 'REMOVE_ITEM_FAIL',
            payload: error
        })
    }
}

export const deleteCart = (id) => async (dispatch) => {
    try{
        var data = await Constants.DeleteAPI(`deletecart/${id}`, null);
        dispatch({
            type: 'DELETE_CART_SUCCESS',
            payload: data
        })
    }catch (error) {
        dispatch({
            type: 'DELETE_CART_FAIL',
            payload: error
        })
    }
}

export const getCartCount = () => async (dispatch) => {
    try{
        var data = await Constants.GetAPI(`getcartcount/${val}`, null);
        dispatch({
            type: 'CART_COUNT_SUCCESS',
            payload: data
        })
    }catch (error) {
        dispatch({
            type: 'CART_COUNT_FAIL',
            payload: error
        })
    }
}