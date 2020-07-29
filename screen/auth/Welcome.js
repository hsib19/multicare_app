import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button } from 'react-native-elements';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('screen');

export default class Welcome extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <Block
        style={{ backgroundColor: '#fff' }}
        paddingTop={0}
      >


          <Block margin={[60, 40, 40, 40]} flex={false}>
              <Block center flex={false}>
                  <Text h1 bold secondary>Selamat Datang</Text>
              </Block>
              <Block center flex={false}>
                  <Text caption gray>di aplikasi mobile multicare</Text>
              </Block>

              <Block center margin={[30, 0]} flex={false}>
                  <AutoHeightImage 
                      width={width-100}
                      source={require('../../assets/images/WelcomeLogo.png')}
                  />
              </Block>

              <Block flex={false} marginTop={30}>
                <Block flex={false}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Login') }
                    >
                        <Text center white bold>Masuk</Text>
                    </TouchableOpacity>
                </Block>
                <Block marginTop={25} flex={false}>
                <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.white, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Daftar') }
                    >
                        <Text center bold>Daftar</Text>
                    </TouchableOpacity>
              </Block>
              </Block>

          </Block>

          <Block flex={false} style={{ position: 'absolute', bottom: 20, zIndex: 1, width: '100%', marginLeft: 0 }}>
                <Block marginBottom={5}>
                    <Image 
                        source={require('../../assets/images/KonimexLogo.png')}
                        style={{ width: 81, height: 30, alignSelf: 'center' }}
                    />
                </Block>
              <Text center gray caption>V 1.0</Text>
          </Block>

      </Block>
    );
  }

}