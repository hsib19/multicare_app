import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Overlay } from 'react-native-elements';
import { colors } from '../../constants/theme';
import axios from 'axios';
import { apiUrl, apiConfig } from '../../constants/api';

const { width } = Dimensions.get('screen');

export default class Daftar extends React.Component {
  constructor(){
    super();

    this.state = {
        nama: '',
        ktp: '',
        hp: '',
        password: '',
        confirmSandi: '',
        errorNama : '',
        errorKtp : '',
        errorHp : '',
        errorPassword : '',
        errorConfirmPassword : '',
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

inputChange(jenis, text) {

    if(jenis == "nama") {
        if(text.length == 0) {
            this.setState({ 
                nama: text,
                errorNama: 'Nama tidak boleh kosong!',
             })
        } else {
            this.setState({ 
                nama: text,
                errorNama: '',
             })
        }
    } else if(jenis == "ktp") {

        
        this.setState({ 
            ktp: text
         })

        if(text.length == 0) {
            this.setState({ 
                errorKtp: 'KTP tidak boleh kosong!',
             })
        } else if(text.length < 16) {
            this.setState({ 
                errorKtp: 'No. KTP harus 16 digit!',
             })
        } else {

            if(isNaN(text)){
                this.setState({ 
                    errorKtp: 'Harus diisi numeric!',
                 })
            } else {
                this.setState({ 
                    errorKtp: '',
                 })
            }

        }
    } else if(jenis == "hp") {

        this.setState({ 
            hp: text
         })

        if(text.length == 0) {
            this.setState({ 
                errorHp: 'Hp tidak boleh kosong!',
             })
        } else if(text.length < 11) {
            this.setState({ 
                errorHp: 'No. Hp minimal 11 digit!',
             })
        } else {

            if(isNaN(text)){
                this.setState({ 
                    errorHp: 'Harus diisi numeric!',
                 })
            } else {
                this.setState({ 
                    errorHp: '',
                 })
            }

        }
    } else if(jenis == "password") {

        this.setState({
            password: text
        })

        if(text.length < 8) {
            this.setState({ 
                errorPassword: 'Password minimal 8 karakter!',
             })
        } else {
            this.setState({ 
                errorPassword: '',
             })
        }
    } else if(jenis == "confirmPassword") {

        this.setState({
            confirmPassword: text
        })

        if(this.state.password != text) {
            this.setState({ 
                errorConfirmPassword: 'Password tidak sama!',
             })
        } else {
            this.setState({ 
                errorConfirmPassword: '',
             })
        }
    }

}

prosesDaftar(){
    
    const { ktp, hp, password, confirmPassword } = this.state;

    this.setState({
        loadingProses: true
    })

    const dataPost = {
        ktp,
        hp,
        password,
        konfirmasi_password: confirmPassword
    }

    axios
          .post(apiUrl + 'main/member/', dataPost, apiConfig)
          .then((response) => {
            const res = response.data;

            if (res.status) {
              this.setState({
                loadingProses: false,
              });

                this.props.navigation.navigate('Verifikasi', {title: 'Verifikasi Kode OTP', data: res.data})

            } else {
              this.setState({
                loadingProses: false,
                message: 'skjdas'
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

    const { ktp, hp, password, confirmPassword, nama, loadingProses } = this.state;

    if(ktp == '' || nama == '' || hp == '' || password == '' || confirmPassword == '' || password != confirmPassword ){
        var disabled = true;
    } else {
        var disabled = false;
    }

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
         showsVerticalScrollIndicator={false}
         >
         <Block margin={[0, 30, 30, 30]}>
             <Text h1 style={{ fontFamily: 'Poppins-Bold' }} secondary>Daftar</Text>
             <Text caption gray style={{ fontFamily: 'Poppins-Bold' }}>Masukan data diri Anda</Text>

             <Block marginTop={20}>
                 <Input 
                     label="Nama (Sesuai KTP)"
                     labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}
                     placeholder="Nama"
                     inputStyle={{ fontSize : 13,  }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="default"
                     onChangeText={(value) => this.inputChange('nama', value) }
                     value={this.state.nama}
                     errorMessage={this.state.errorNama}
                     onSubmitEditing={() => { this.ktpTextInput.focus(); }}
                     returnKeyLabel="Next"
                     blurOnSubmit={false}
                 />
             </Block>

             <Block marginTop={0}>
                 <Input 
                      label="No. KTP"
                      labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}
                     placeholder="No. KTP"
                     inputStyle={{ fontSize : 13,  }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                     onChangeText={(value) => this.inputChange('ktp', value) }
                     value={this.state.ktp}
                     errorMessage={this.state.errorKtp}
                     ref={(input) => { this.ktpTextInput = input; }}
                     onSubmitEditing={() => { this.hpTextInput.focus(); }}
                     returnKeyLabel="Next"
                     blurOnSubmit={false}
                 />
             </Block>

             <Block marginTop={0}>
                 <Input 
                      label="No. Telepon"
                      labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}
                     placeholder="No. Telepon"
                     inputStyle={{ fontSize : 13, paddingLeft: 10 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                     leftIcon={<Text style={{ borderRightWidth: 1, borderRightColor: '#ddd', paddingRight: 10 }}>+62</Text>}
                     onChangeText={(value) => this.inputChange('hp', value) }
                     value={this.state.hp}
                     errorMessage={this.state.errorHp}
                     ref={(input) => { this.hpTextInput = input; }}
                     onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                     returnKeyLabel="Next"
                     blurOnSubmit={false}
                 />
             </Block>

             <Block marginTop={0}>
                 <Input 
                 label="Kata Sandi"
                      labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}
                     placeholder="Masukan Kata Sandi"
                     inputStyle={{ fontSize : 13, paddingLeft: 0 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="default"
                     onChangeText={(value) => this.inputChange('password', value) }
                     value={this.state.password}
                     errorMessage={this.state.errorPassword}
                     ref={(input) => { this.passwordTextInput = input; }}
                     onSubmitEditing={() => { this.confirmPasswordTextInput.focus(); }}
                     returnKeyLabel="Next"
                     blurOnSubmit={false}
                 />
             </Block>

             <Block marginTop={0}>
                 <Input 
                 label="Konfirmasi Kata Sandi"
                      labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Bold', fontWeight: 'normal' }}
                     placeholder="Konfirmasi Kata Sandi"
                     inputStyle={{ fontSize : 13, paddingLeft: 0 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="default"
                     onChangeText={(value) => this.inputChange('confirmPassword', value) }
                     value={this.state.confirmPassword}
                     errorMessage={this.state.errorConfirmPassword}
                     ref={(input) => { this.confirmPasswordTextInput = input; }}
                     returnKeyLabel="Daftar"
                     onSubmitEditing={() => disabled ? '' : this.prosesDaftar() }
                     
                 />
             </Block>

             <Block marginTop={15}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: disabled ? colors.gray : colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.prosesDaftar() }
                        disabled={disabled}
                    >
                        <Text center white bold>Daftar</Text>
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