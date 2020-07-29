import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Overlay } from 'react-native-elements';
import { colors } from '../../constants/theme';
import { connect } from 'react-redux';
import { apiUrl, apiConfig } from '../../constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('screen');

class Login extends React.Component {
  constructor(){
    super();

    this.state = {
        hp: '',
        password: '',
        loadingProses: false
    }

  }

  componentDidMount(){
      this.props.navigation.setOptions({
          title: null,
          headerTintColor: '#000',
          headerStyle: {
              elevation: 0,
          },
          headerLeftContainerStyle:{
              paddingLeft: 10,
          }

      })
  }

  prosesLogin(){

      const { hp, password } = this.state;

      this.setState({
          loadingProses: true
      });

      const dataPost = {
          hp: hp,
          password: password
      }

      axios
          .post(apiUrl + 'main/member/login', dataPost, apiConfig)
          .then((response) => {
            const res = response.data;

            if (res.status) {

              this.setState({
                loadingProses: false,
              });

              AsyncStorage.setItem('userid', res.data.userid)
              this.props.login();

            } else {

              this.setState({
                loadingProses: false,
              });

              ToastAndroid.show(res.message, ToastAndroid.SHORT);
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
          .then(() => {
            // always executed
          });

  }


  render(){

    const { hp, password, loadingProses }  = this.state;

    return(
      <Block
        style={{ backgroundColor: '#fff' }}
        paddingTop={0}
      >

      
     <Overlay
        isVisible={loadingProses}
        overlayStyle={{borderRadius: 20, paddingVertical: 10 }}
      >
          <Block flex={false} row>
                <ActivityIndicator size="large" color={colors.primary} />
          </Block>
      </Overlay>

         <ScrollView
         style={{ zIndex: 2 }}
         >
         <Block margin={[0, 30, 30, 30]}>
             <Text h1 style={{ fontFamily: 'Poppins-Bold' }} secondary>Masuk</Text>
             <Text caption gray style={{ fontFamily: 'Poppins-Bold' }}>Masukan no. telepon dan kata sandi Anda</Text>

             <Block marginTop={50}>
                 <Input 
                      label="No. Telepon"
                      labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal'}}
                     placeholder="No. Telepon"
                     inputStyle={{ fontSize : 13, paddingLeft: 10 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                     leftIcon={<Text style={{ borderRightWidth: 1, borderRightColor: '#ddd', paddingRight: 10 }}>+62</Text>}
                     onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                     returnKeyLabel="Next"
                     blurOnSubmit={false}
                     onChangeText={(hp) => this.setState({ hp }) }
                     value={hp}
                 />
             </Block>

             <Block marginTop={0}>
                 <Input 
                 label="Kata Sandi"
                    labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal'}}
                     placeholder="Masukan Kata Sandi"
                     inputStyle={{ fontSize : 13, paddingLeft: 0 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="default"
                     ref={(input) => { this.passwordTextInput = input; }}
                     returnKeyLabel="Login"
                     onChangeText={(password) => this.setState({ password }) }
                     value={password}
                     onSubmitEditing={() => this.prosesLogin() }
                 />
             </Block>

             <Block marginTop={15}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.prosesLogin() }
                    >
                        <Text center white bold>Masuk</Text>
                    </TouchableOpacity>
                </Block>

                <Block center marginTop={30}>
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('LupaPassword') }

                >

                    <Text>Lupa kata sandi ?</Text>
                </TouchableOpacity>
                </Block>

                <Block marginTop={50}>
                <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.white, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Daftar') }
                    >
                        <Text center h3 bold>Daftar</Text>
                    </TouchableOpacity>
                </Block>

                

         </Block>
         </ScrollView>

         <ScrollView
            style={{ flex: 1, position: 'absolute', left: 0, bottom: 0, width: '100%', zIndex: 1 }}
         >

                    <Block center>
                        <AutoHeightImage 
                            width={width-60}
                            source={require('../../assets/images/BottomBG.png')}
                        />
                        <Text gray style={{ position: 'absolute', bottom: 20 }}>V 1.0</Text>
                    </Block>

         </ScrollView>


      </Block>
    );
  }

}

const mapStateToProps = (state, ownProps) => {

    return {
        items: state
    }
  
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        // login: () => dispatch(fetchAccount()),
        login: (dataAccount) => dispatch({
            type: "FETCH_ACCOUNT",
            payload: dataAccount
        }),
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);