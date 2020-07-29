import { FETCH_ACCOUNT, REQUEST_FETCH_ACCOUNT, FAILURE_FETCH_ACCOUNT } from '../type';
import axios from 'axios';
import { apiUrl, apiConfig } from '../../constants/api';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchingAccountRequest = () => ({ type: REQUEST_FETCH_ACCOUNT });

export const fetchingAccountSuccess = (json) => ({ 
    type: FETCH_ACCOUNT ,
    payload: json
});

export const fetchingAccountFailure = (error) => ({ 
    type: FAILURE_FETCH_ACCOUNT ,
    payload: error
});

export const fetchAccount = () => {

    return async dispatch => {
        dispatch(fetchingAccountRequest());

        const userid = await AsyncStorage.getItem('userid');

        const dataPost = {
            userid
        }

        axios
          .post(apiUrl + 'main/member/auth', dataPost, apiConfig)
          .then((response) => {
            const res = response.data;

            if (res.status) {

              dispatch(fetchingAccountSuccess(res.data))

            } else {

            dispatch(fetchingAccountFailure(error));
             }
          })
          .catch((error) => {
            // handle error
            dispatch(fetchingAccountFailure(error));
          })
          .then(() => {
            // always executed
          });

    }
}