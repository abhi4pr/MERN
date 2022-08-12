import * as Constants from "../Constants";
import {val} from '../Reusable';

export const sendLoginData = (payLoadData) => async (dispatch) => {
    try {
        return await Constants.PostAPI('loginuser', payLoadData)
        .then((res) => {
            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: res
            })
            return res
        })
        .catch((err) => {
            return err
        })        
    } catch(error){
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error
        })
    }
}

export const sendRegisterData = (payLoadData) => async (dispatch) => {
    try {
        return await Constants.PostAPI('registeruser', payLoadData)
        .then((res)=>{
            dispatch({
                type: 'USER_REGISTER_SUCCESS',
                payload: res
            })
            return res
        })
        .catch((err) => {
            return err
        })
    } catch(error){
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error
        })
    }
}

export const getSingleUser = () => async (dispatch) => {
    try {
        var data = await Constants.GetAPI(`getsingleuser/${val}`, null);
        dispatch({
            type: 'USER_SINGLE_SUCCESS',
            payload: data
        })
    } catch(error){
        dispatch({
            type: 'USER_SINGLE_FAIL',
            payload: error
        })
    }
}

export const profileUpdate = (payLoadData) => async (dispatch) => {
    try{
        return await Constants.PutAPI(`edituser/${val}`, payLoadData)
        .then((res)=>{
            dispatch({
                type: 'USER_UPDATE_SUCCESS',
                payload: res
            })
            return res
        })
    } catch(error){
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: error
        })
    }
}