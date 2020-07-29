import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Overlay, Rating } from 'react-native-elements';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('screen');

export default class BeriUlasan extends React.Component {
  constructor(){
    super();

    this.state={
        status: 4,
        modalDetail: false
    }

  }

  componentDidMount(){
  
  }

  render(){

    const {status, modalDetail} = this.state;

    return(

         <ScrollView
         style={{ backgroundColor: '#fff' }}
         >

         <Block margin={20}>
             <Block>
                 <Text bold>Ulasan Pesanan</Text>
                 <Block margin={[20, 0]}>
                     <Rating 
                         imageSize={30}
                         ratingCount={5}
                         startingValue={4}
                     />
                 </Block>
             </Block>
             <Block>
                <Block>
                    <Text bold>Deskripsi Pesanan</Text>
                </Block>
                <Block marginTop={10}>
                    <Input 
                        multiline
                        placeholder="Bagimana pesanannya ? Sesuaikah manfaatnya ?"
                        inputStyle={{ fontSize: 13, padding: 10 }}
                        inputContainerStyle={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10 }}
                        containerStyle={{ paddingLeft: 0 }}
                    />
                    <Text caption gray>0 / 200</Text>
                </Block>
             </Block>

             <Block marginTop={15}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Login') }
                    >
                        <Text center white h3 bold>Selesai</Text>
                    </TouchableOpacity>
                </Block>

         </Block>
         
         </ScrollView>

    );
  }

}