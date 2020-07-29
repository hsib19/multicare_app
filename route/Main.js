import React from 'react';
import { View } from 'react-native';
import { Block, Text } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

import { colors } from '../constants/theme';

const HomeStack = createStackNavigator();
const ProdukStack = createStackNavigator();
const BusinesInfoStack = createStackNavigator();

import Home from '../screen/home/Home';
import Produk from '../screen/home/Produk';
import ProdukDetail from '../screen/home/ProdukDetail';
import BusinessInfo from '../screen/home/BusinessInfo';
import StatusPesanan from '../screen/transaksi/StatusPesanan';
import BeriUlasan from '../screen/transaksi/BeriUlasan';
import KataSandiBaru from '../screen/auth/KataSandiBaru';
import Notifikasi from '../screen/home/Notifikasi';
import Keranjang from '../screen/home/Keranjang';
import Pengiriman from '../screen/transaksi/Pengiriman';
import { Icon, Image } from 'react-native-elements';

import AutoHeightImage from 'react-native-auto-height-image';
import AlamatList from '../screen/akun/AlamatList';
import AlamatForm from '../screen/akun/AlamatForm';
import GetProvinsi from '../screen/akun/GetProvinsi';
import GetKota from '../screen/akun/GetKota';
import GetKecamatan from '../screen/akun/GetKecamatan';
import GetKodepos from '../screen/akun/GetKodepos';
import GetKelurahan from '../screen/akun/GetKelurahan';


const HomeStackNavigator = ({ navigation, route }) => {

    if(route.state){
      navigation.setOptions({
        tabBarVisible: route.state.index > 0 ? false : true
      })
    }
  
    return (
      <HomeStack.Navigator 
        screenOptions={({route}) => ({
        headerShown: route.name == "Home" ? false : true ,
        title: route.name,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                  color: colors.secondary,
                },
         
          headerBackTitleStyle: {
            color: colors.primary
          },
          headerTintColor: colors.black,
                
      })} 
      headerMode="screen"
      mode="card"
      initialRouteName="Home"
      >  
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen options={{ title: 'asdasd' }} name="ProdukDetail" component={ProdukDetail} />
        <HomeStack.Screen options={{ title: 'Notifikasi' }} name="Notifikasi" component={Notifikasi} />
        <HomeStack.Screen options={{ title: 'Keranjang' }} name="Keranjang" component={Keranjang} />
        <HomeStack.Screen options={{ title: 'Pengiriman' }} name="Pengiriman" component={Pengiriman} />
        <HomeStack.Screen options={{ title: 'Alamat List' }} name="AlamatList" component={AlamatList} />
        <HomeStack.Screen options={{ title: 'Tambah Alamat' }} name="AlamatForm" component={AlamatForm} />
        <HomeStack.Screen options={{ title: 'Pilih Provinsi' }} name="GetProvinsi" component={GetProvinsi} />
        <HomeStack.Screen options={{ title: 'Pilih Kota' }} name="GetKota" component={GetKota} />
        <HomeStack.Screen options={{ title: 'Pilih Kecamatan' }} name="GetKecamatan" component={GetKecamatan} />
        <HomeStack.Screen options={{ title: 'Pilih Kelurahan' }} name="GetKelurahan" component={GetKelurahan} />
        <HomeStack.Screen options={{ title: 'Pilih Kode Pos' }} name="GetKodepos" component={GetKodepos} />
      </HomeStack.Navigator>
    )
  }

  const ProdukStackNavigator = ({ navigation, route }) => {

    if(route.state){
      navigation.setOptions({
        tabBarVisible: route.state.index > 0 ? false : true
      })
    }
  
    return (
      <ProdukStack.Navigator 
        screenOptions={({route}) => ({
        headerShown: route.name == "Produk" ? true : true ,
        title: route.name,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  color: colors.black
                },
                headerStyle: {
                  backgroundColor: colors.white,
                },
          headerBackTitleStyle: {
            color: colors.primary
          },
          headerTintColor: colors.white,
                
      })} 
      headerMode="screen"
      mode="card"
      initialRouteName="Produk"
      >  
        <ProdukStack.Screen options={{ title: 'asdasd' }} name="Produk" component={Produk} />
        <ProdukStack.Screen options={{ title: 'asdasd' }} name="ProdukDetail" component={ProdukDetail} />
      </ProdukStack.Navigator>
    )
  }

  const BusinesInfoStackNavigator = ({ navigation, route }) => {

    if(route.state){
      navigation.setOptions({
        tabBarVisible: route.state.index > 0 ? false : true
      })
    }
  
    return (
      <BusinesInfoStack.Navigator 
        screenOptions={({route}) => ({
        headerShown: route.name == "BusinessInfo" ? true : true ,
        title: route.name,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitleStyle: {
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  color: colors.secondary,
                },
        
          headerBackTitleStyle: {
            color: colors.primary
          },
          headerTintColor: colors.black,
                
      })} 
      headerMode="screen"
      mode="card"
      initialRouteName="BusinessInfo"
      >  
        <BusinesInfoStack.Screen name="BusinessInfo" component={BusinessInfo} />
        <BusinesInfoStack.Screen options={{ title: 'Status Pemesanan' }} name="StatusPesanan" component={StatusPesanan} />
        <BusinesInfoStack.Screen options={{ title: 'Ulasan Pemesanan' }} name="BeriUlasan" component={BeriUlasan} />
      </BusinesInfoStack.Navigator>
    )
  }

export default class Main extends React.Component {
  constructor(){
    super();

    this.state = {
      loading: true
    }

  }

  render(){
    return(
    <Tab.Navigator
    initialRouteName="Home"
    lazy={true}
    tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: 'gray',
            tabStyle: {
              paddingVertical: 5
            },
            style: {
              borderTopWidth: 0,
            },
            labelStyle: {
              fontFamily:'Poppins-Regular',
              marginTop: 1
            }
          }}
        screenOptions={({ route }) => ({
        tabBarIcon :({ color, size })=> {
          if(route.name == "Home"){
            var icon = require("../assets/images/home.png")
            var width = 22;
          } else if(route.name == "Produk"){
            var icon = require("../assets/images/produks.png")
            var width = 26;
          }else if(route.name == "Business Info"){
            var icon = require("../assets/images/business.png")
            var width = 28;
          }else if(route.name == "BTR"){
            var icon = require("../assets/images/btr.png")
            var width = 25;
          }else if(route.name == "Akun"){
            var icon = require("../assets/images/akun.png")
            var width = 18;
          }

          return (
              <AutoHeightImage 
                  source={icon}
                  width={width}
              />
          ) 
  
        }
    })} 
    >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Produk" component={ProdukStackNavigator} />
        <Tab.Screen name="Business Info" component={BusinesInfoStackNavigator} />
        <Tab.Screen name="BTR" component={SettingsScreen} />
        <Tab.Screen name="Akun" component={SettingsScreen} />
      </Tab.Navigator>
    )
  }

}