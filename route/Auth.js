import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthMain from './AuthMain';
import Main from './Main';
import { connect } from 'react-redux';
import { fetchAccount } from '../redux/actions/Account';
import { Block } from '../components';
import { colors } from '../constants/theme';
import { fetchAlamat } from '../redux/actions/Alamat';

const Stack = createStackNavigator();

class Auth extends React.Component {

    UNSAFE_componentWillMount(){
        this.props.dataAccount()
        this.props.getAlamat()
    }

    render(){

        if(this.props.items.loading){
            return (
                <Block middle center>
                    <ActivityIndicator size="large" color={colors.primary} />
                </Block>
            )
        }

        return(
            <NavigationContainer>
            {this.props.items.data == undefined && this.props.items.data.data == null ?
                <AuthMain />
            :
                <Main />
            }
            </NavigationContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        items: state.dataUser
    }

}

const mapDispatchToProps = (dispatch) => {
  return {
      dataAccount: () => dispatch(fetchAccount()),
      getAlamat: () => dispatch(fetchAlamat()),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Auth);