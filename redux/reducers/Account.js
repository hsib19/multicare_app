import { FETCH_ACCOUNT, REQUEST_FETCH_ACCOUNT, LOGOUT_ACCOUNT, CHANGE_ACCOUNT } from '../type';

const initialState = {
    loading: false,
    data: {},
}

export default (state = initialState, action) => {

    const dataAccount = action.payload;

    // console.log(action.type)

    switch(action.type) {

        case REQUEST_FETCH_ACCOUNT :

        return {
            ...state,
            data: {},
            loading: true
        }
        
        case FETCH_ACCOUNT :

            return {
                ...state,
                data: dataAccount,
                loading: false,
              };

        case CHANGE_ACCOUNT :

        // AsyncStorage.removeItem('userid');
        // AsyncStorage.setItem('userid', dataAccount.userid);

        return {
            ...state,
            data: dataAccount,
            loading: true,
        };

        case LOGOUT_ACCOUNT :

        // AsyncStorage.clear();

        return {
            ...state,
            data: {},
            loading: false
            };

    default:
    return state;
}
}