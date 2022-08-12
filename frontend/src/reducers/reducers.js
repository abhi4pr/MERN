import { combineReducers } from 'redux';
import { getProductsReducer } from './productReducer';
import { getCategoryReducer } from './categoryReducer';
import { getOrderReducer } from './orderReducer';
import { getUsersReducer } from './userReducer';
import { getCartReducer } from './cartReducer';

const reducers = combineReducers({
    getProductsReducer,
    getCategoryReducer,
    getOrderReducer,
    getUsersReducer,
    getCartReducer
});

export default reducers;