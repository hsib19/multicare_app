import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input } from 'react-native-elements';
import { colors } from '../../constants/theme';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';


const { width } = Dimensions.get('screen');

export default class LupaPassword extends React.Component {
  constructor(){
    super();

    this.state = {
        value: '',
        setValue: '',
        cell_count: 4
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

  getCellOnLayoutHandler(key){

    console.log(key)
    
  }

  kodeOTP(otp) {

    this.setState({
        value: otp
    })

  }

  render(){
      
    const { value, setValue, cell_count } = this.state;

    return(
      <Block
        style={{ backgroundColor: '#fff' }}
        paddingTop={0}
      >

         <ScrollView
         style={{ zIndex: 2 }}
         >
         <Block margin={[30, 30]}>

             <Text h1 left bold secondary>Lupa Kata Sandi</Text>
             <Text caption gray>Masukan nomor telpon Anda</Text>

             <Block marginTop={30}>

             <AutoHeightImage 
                 width={width-100}
                 source={require('../../assets/images/lupa_password.png')}
                 style={{ alignSelf: 'center' }}
             />

             </Block>

             <Block marginVertical={20}>
             <Block marginTop={30}>
                 <Input 
                      label="No. Telepon"
                      labelStyle={{ fontSize: 13 }}
                     placeholder="No. Telepon"
                     inputStyle={{ fontSize : 13, paddingLeft: 10 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                     leftIcon={<Text style={{ borderRightWidth: 1, borderRightColor: '#ddd', paddingRight: 10 }}>+62</Text>}
                 />
             </Block>
             </Block>

             <Block marginTop={0}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Verifikasi', {title: 'Lupa Kata Sandi'}) }
                    >
                        <Text center white h3 bold>Kirim</Text>
                    </TouchableOpacity>
                </Block>

                

         </Block>
         </ScrollView>

      </Block>
    );
  }

}

const styles = StyleSheet.create({
    root: {padding: 20, minHeight: 300},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {
      marginTop: 20,
      width: 280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    cellRoot: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#ccc',
      marginRight: 20,
      borderBottomWidth: 2,
    },
    cellText: {
      color: '#000',
      fontSize: 36,
      textAlign: 'center',
    },
    focusCell: {
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
    },
})