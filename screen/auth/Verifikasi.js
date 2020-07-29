import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, Keyboard, ActivityIndicator } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Overlay } from 'react-native-elements';
import { colors } from '../../constants/theme';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';


const { width } = Dimensions.get('screen');

export default class Verifikasi extends React.Component {
  constructor(){
    super();

    this.state = {
        value: '',
        setValue: '',
        cell_count: 4,
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

  getCellOnLayoutHandler(key){

    console.log(key)
    
  }

  kodeOTP(otp) {

    this.setState({
        value: otp
    })

  }

  verifAccount(){
    const otp = this.state.value;

    this.setState({
      loadingProses: true
    });

    console.log(otp)

  }


  render(){
      
    const { value, setValue, cell_count, loadingProses } = this.state;
    
    const {title, data} = this.props.route.params;

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

             <Text h1 center bold secondary>{title}</Text>

             <Block marginTop={30}>

             <AutoHeightImage 
                 width={width-100}
                 source={require('../../assets/images/verif_otp.png')}
             />

             </Block>

             <Block marginVertical={20}>
                 <Text caption gray>Kode OTP telah dikirim ke nomor <Text caption style={{ fontFamily: 'Poppins-Bold' }}> +62{data.hp}</Text></Text>
             </Block>

             <Block>
             <CodeField
                value={value}
                onChangeText={(value) => this.kodeOTP(value)}
                cellCount={cell_count}
                rootStyle={styles.codeFieldRoot}
                onSubmitEditing={() => Keyboard.dismiss() }
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                <Block
                    onLayout={() => this.getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </Block>
                )}
            />
             </Block>

             <Block row center margin={[30, 0]} middle>
                 <Text center caption gray>Belum menerima kode OTP ?</Text>                 
                 <TouchableOpacity>
                     <Text center caption primary bold> Kirim Ulang</Text>
                 </TouchableOpacity>
             </Block>

             <Block marginTop={0}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: this.state.value.length < 4 ? colors.gray : colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.verifAccount() }
                        disabled={this.state.value.length < 4 ? true : false}
                    >
                        <Text center white h3 bold>Verifikasi</Text>
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