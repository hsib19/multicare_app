import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Badge } from 'react-native-elements';
import { colors } from '../../constants/theme';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width } = Dimensions.get('screen');

export default class Produk extends React.Component {
  constructor(){
    super();
  }

  componentDidMount(){
      this.props.navigation.setOptions({
          headerTitle: () => (
              <Block marginTop={20} marginRight={10}>
                  <Input 
                        inputStyle={{ fontSize: 13 }}
                        placeholder="Cari produk yang Anda inginkan"
                        inputContainerStyle={{ backgroundColor: '#F8F8F8', borderBottomWidth: 0, borderRadius: 10, height: 40 }}
                        leftIcon={<Icon name="search1" type="antdesign" color={colors.gray} size={18} />}
                        leftIconContainerStyle={{ paddingLeft: 10 }}
                        containerStyle={{ paddingLeft: 0}}
                    />
              </Block>
          ),
          headerRight: () => (
              <Block row middle center paddingRight={20}>
                     <TouchableOpacity
                        style={{ marginRight: 10 }}
                     >
                             <Icon name="md-cart" type="ionicon" size={30} color={colors.gray} />
                             <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                value={2}
                                textStyle={{ fontSize: 9 }}
                                badgeStyle={{ borderWidth: 0 }}
                            />
                     </TouchableOpacity>
                     <TouchableOpacity>
                             <Icon name="ios-notifications" type="ionicon" size={30} color={colors.gray} />
                             <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                value={2}
                                textStyle={{ fontSize: 9 }}
                                badgeStyle={{ borderWidth: 0 }}
                            />
                     </TouchableOpacity>
              </Block>
          )
      });
  }

  render(){

    const tabsList = [
        {
            id: 1,
            nama: 'Health Focus'
        },
        {
            id: 2,
            nama: 'Beauty Focus'
        },
        {
            id: 3,
            nama: 'Promo'
        },
        {
            id: 4,
            nama: 'Recommended'
        }
    ]

    return(
      <Block white>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
          <Block flex={false} margin={[20, 20, 0, 20]}>
              <Text h3 secondary style={{ fontFamily: 'Poppins-Bold' }}>Kategori Produk</Text>
          </Block>
          <Block margin={0}>
              <Block>
              <ScrollableTabView
                style={{ marginTop: 10 }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarActiveTextColor={colors.primary}
                tabBarInactiveTextColor={colors.gray}
                tabBarUnderlineStyle={{ backgroundColor: colors.primary, height: 2 }}
                tabBarTextStyle={{ fontFamily: 'Poppins-Bold', fontSize: 13 }}
            >
                    {tabsList.map((item, index) => 

                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        key={index}
                     tabLabel={item.nama}
                    >
                <Block marginTop={20} row style={{ flexWrap: 'wrap' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8 , 9, 10].map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => this.props.navigation.navigate('ProdukDetail') }
                            >
                                <Block flex={false}
                                    white
                                    style={{ width: width/2-30, marginRight: 20, elevation: 7, borderRadius: 10, padding: 15}}
                                    margin={[0, 20, 20, 20]}
                                    marginRight={item%2 == 1 ? 0 : 20}
                                >
                                    <Block flex={false}>
                                        <Image 
                                            style={{ width: 130, height: 110, alignSelf: 'center' }}
                                            source={require('../../assets/images/d-royal-jelly.png')}
                                        />
                                    </Block>
                                    <Block flex={false}>
                                        <Text secondary bold>VitaCare Royal Jelly</Text>
                                    </Block>
                                    <Block flex={false} marginTop={5}>
                                        <Text primary bold value={250000} uang />
                                    </Block>
                                </Block>
                            </TouchableWithoutFeedback>
                        ))}
                </Block>
                    </ScrollView>

                    )}
            </ScrollableTabView>
              </Block>
          </Block>
      </Block>
    );
  }

}