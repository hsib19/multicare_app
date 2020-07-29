import { FETCH_ALAMAT, REQUEST_FETCH_ALAMAT, LOGOUT_CART, SET_ALAMAT } from '../type';

const initialState = {
    loading: false,
    alamat: {},
    tanggal_kirim: '',
    ongkir: {}
}

export default (state = initialState, action) => {

    const data = action.payload;

    switch(action.type) {

        case REQUEST_FETCH_ALAMAT :

        return {
            ...state,
            loading: true
        }
        
        case FETCH_ALAMAT :

            return {
                ...state,
                loading: false,
                alamat: data,
              };

        case SET_ALAMAT :              

        return {
            ...state,
            alamat: data,
            loading: false,
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