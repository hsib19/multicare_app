import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Block } from './components';
import Auth from './route/Auth';
import GlobalFont from 'react-native-global-font'
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import accountReducer from './redux/reducers/Account'
import checkoutReducer from './redux/reducers/Checkout'
import cartReducer from './redux/reducers/Cart'
import thunk from 'redux-thunk';

const rootReducers = combineReducers({ 
  dataUser: accountReducer,
  dataCart: cartReducer,
  dataCheckout: checkoutReducer,
 });

 const store = createStore(rootReducers, applyMiddleware(thunk));

export default class App extends React.Component {
  constructor(){
    super();
  }

  componentDidMount() {
    let fontName = 'Poppins-Regular'
    GlobalFont.applyGlobal(fontName)
 }

  render(){
    return(
      <Provider store={store}>
        <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content" />
        <Auth />
      </Provider>
    );
  }

}