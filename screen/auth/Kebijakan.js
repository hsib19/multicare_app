import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input } from 'react-native-elements';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('screen');

export default class Kebijakan extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <Block
        style={{ backgroundColor: '#fff' }}
        paddingTop={0}
      >

         <ScrollView
         style={{ zIndex: 2 }}
         >
         <Block margin={[30, 30]}>

             <Block marginBottom={20}>
             <Text h1 bold secondary>Kebijakan</Text>
             </Block>

             <Block marginBottom={20}>
                 <Text>
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                 </Text>

             </Block>

             <Block marginBottom={20}>
                 <Text>
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                 </Text>

             </Block>

             


                <Block marginTop={50}>
                <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                    >
                        <Text center h3 white bold>Setuju</Text>
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
                    </Block>

         </ScrollView>


      </Block>
    );
  }

}