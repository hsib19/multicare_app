import { FETCH_ALAMAT, REQUEST_FETCH_ALAMAT, FAILURE_FETCH_ALAMAT } from '../type';
import AsyncStorage from '@react-native-community/async-storage';
import { apiUrl, apiConfig } from '../../constants/api';

export const fetchingAlamatRequest = () => ({ type: REQUEST_FETCH_ALAMAT });

export const fetchingAlamatSuccess = (json) => ({ 
    type: FETCH_ALAMAT ,
    payload: json
});

export const fetchingAlamatFailure = (error) => ({ 
    type: FAILURE_FETCH_ALAMAT ,
    payload: error
});

export const fetchAlamat = () => {

    return async dispatch => {
        dispatch(fetchingAlamatRequest());
        try {

            const userid = await AsyncStorage.getItem('userid'); 

            let response = await fetch(apiUrl+'main/member/alamat?userid='+userid+"&status=1", apiConfig );
            let json = await response.json();
            dispatch(fetchingAlamatSuccess(json.data))
        } catch (error){
            dispatch(fetchingAlamatFailure(error));
        }
    }
}