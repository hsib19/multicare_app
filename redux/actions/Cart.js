import { FETCH_CART, REQUEST_FETCH_CART, FAILURE_FETCH_CART } from '../type';
import AsyncStorage from '@react-native-community/async-storage';
import { apiUrl, apiConfig } from '../../constants/api';
import axios from 'axios';
import { connect } from 'react-redux';

export const fetchingCartRequest = () => ({ type: REQUEST_FETCH_CART });

export const fetchingCartSuccess = (json) => ({ 
    type: FETCH_CART ,
    payload: json
});

export const fetchingCartFailure = (error) => ({ 
    type: FAILURE_FETCH_CART ,
    payload: error
});

export const fetchCart = () => {

    return async dispatch => {
        dispatch(fetchingCartRequest());
        try {

            const userid = await AsyncStorage.getItem('userid'); 

            let response = await fetch(apiUrl+'main/member/cart?userid='+userid, apiConfig );
            let json = await response.json();
            dispatch(fetchingCartSuccess(json))
        } catch (error){
            dispatch(fetchingCartFailure(error));
        }
    }
}


export const updateCart = (item, jenis) => {

    return async dispatch => {

            const userid = await AsyncStorage.getItem('userid'); 

            const dataCart = {
                userid: userid,
                id: item.id_product,
                kode_produk: item.id_product,
                harga_produk: item.harga_normal,
                nama_produk: item.nama_produk,
                jenis: jenis,
                qty_produk: 1,
            }
            
            axios.post(apiUrl+'main/member/cart', dataCart, apiConfig)
                .then((response) => {

                    const res = response.data;


                    dispatch(fetchingCartSuccess(res))

                 })
                .catch((error) => {
                    // handle error
                    console.log(error)
                    dispatch(fetchingCartFailure(error));
                })
                .then(() => {
                    // always executed
                });

    }
}