import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input } from 'react-native-elements';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('screen');

export default class KataSandiBaru extends React.Component {
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
         <Block margin={[0, 30, 30, 30]}>

             <Text h1 left bold secondary>Password Baru</Text>
             <Text style={{ marginTop: 5 }} caption bold gray>Masukan password baru Anda untuk {'\n'}menyelesaikan proses masuk</Text>

               
             <Block marginVertical={30}>
             <Block marginTop={10}>
                 <Input 
                 label="Kata Sandi Baru"
                      labelStyle={{ fontSize: 13 }}
                     placeholder="Masukan Kata Sandi"
                     inputStyle={{ fontSize : 13, paddingLeft: 0 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                 />
             </Block>

             <Block marginTop={10}>
                 <Input 
                 label="Konfirmasi Kata Sandi Baru"
                      labelStyle={{ fontSize: 13 }}
                     placeholder="Masukan Kata Sandi"
                     inputStyle={{ fontSize : 13, paddingLeft: 0 }}
                     inputContainerStyle={{ borderBottomColor: '#ddd' }}
                     containerStyle={{ paddingLeft: 0, marginLeft: 0 }}                     
                     keyboardAppearance="default"
                     keyboardType="number-pad"
                 />
             </Block>

             </Block>

             <Block marginTop={0}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 10, elevation: 9 }}
                    >
                        <Text center white h3 bold>Ubah Kata Sandi</Text>
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