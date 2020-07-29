import { FETCH_CART, REQUEST_FETCH_CART, LOGOUT_CART, CHANGE_CART } from '../type';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    loading: false,
    data: [],
    total_order: 0,
}

export default (state = initialState, action) => {

    const dataCart = action.payload;

    switch(action.type) {

        case REQUEST_FETCH_CART :

        return {
            ...state,
            data: [],
            loading: true
        }
        
        case FETCH_CART :

            return {
                ...state,
                loading: false,
                data: dataCart.data,
                total_order: dataCart.total_order,
              };

        case CHANGE_CART :


        return {
            ...state,
            data: dataCart,
            loading: true,
        };

        case LOGOUT_CART :


        return {
            ...state,
            data: {},
            loading: false
            };

    default:
    return state;
}
}