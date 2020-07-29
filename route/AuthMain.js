import React from 'react';
import { View } from 'react-native';
import { Block, Text } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { colors } from '../constants/theme';

const Stack = createStackNavigator();

import Welcome from '../screen/auth/Welcome';
import Login from '../screen/auth/Login';
import Daftar from '../screen/auth/Daftar';
import LupaPassword from '../screen/auth/LupaPassword';
import Verifikasi from '../screen/auth/Verifikasi';
import KataSandiBaru from '../screen/auth/KataSandiBaru';




export default class AuthMain extends React.Component {
  constructor(){
    super();

    this.state = {
      loading: true
    }

  }

  render(){
    return(
        <Stack.Navigator
          mode="card"
          headerMode="screen"
          initialRouteName="Welcome"
          screenOptions={({route}) => ({
            title: route.name,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: route.name == "Welcome" ? false : true,
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontSize: 16
            }
          })} 
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Daftar" component={Daftar} />
          <Stack.Screen name="LupaPassword" component={LupaPassword} />
          <Stack.Screen name="Verifikasi" component={Verifikasi} />
          <Stack.Screen name="KataSandiBaru" component={KataSandiBaru} />
        </Stack.Navigator>
    )
  }

}