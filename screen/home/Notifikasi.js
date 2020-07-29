import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Badge } from 'react-native-elements';
import { colors } from '../../constants/theme';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

const { width } = Dimensions.get('screen');

export default class Notifikasi extends React.Component {
  constructor(){
    super();
  }

  componentDidMount(){
    //   this.props.navigation.setOptions({
    //    tit
    //   });
  }

  render(){

    const tabsList = [
        {
            id: 1,
            nama: 'Semua'
        },
        {
            id: 2,
            nama: 'Info'
        },
        {
            id: 3,
            nama: 'Promosi'
        },
        {
            id: 4,
            nama: 'Aktivitas'
        }
    ]

    return(
      <Block white>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />

          <Block margin={0}>
              <Block>
              <ScrollableTabView
                style={{ marginTop: 10 }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarActiveTextColor={colors.primary}
                tabBarInactiveTextColor={colors.gray}
                tabBarUnderlineStyle={{ backgroundColor: colors.primary, height: 2 }}
                tabBarTextStyle={{ fontWeight: 'bold' }}
            >
                    {tabsList.map((item, index) => (
                        <ScrollView
                        showsVerticalScrollIndicator={false}
                        key={index}
                     tabLabel={item.nama}
                    >
                                    <Block>
                                    
                <Block marginTop={20} paddingHorizontal={0}>
     
                        {[1, 2, 3, 4, 5, 6, 7, 8 , 9, 10].map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                // onPress={() => this.props.navigation.navigate('StatusPesanan') }
                            >
                                <Block flex={false}
                                >
                                    <Block padding={[20, 20, 0, 20]} row>
                                        <Block>
                                            <Text bold>Yeay, kamu data rekomendasi bonus</Text>
                                            <Text style={{ marginVertical: 5 }} caption>Rekomendasi Bonus sebesar Rp 10.500 dari pembelanjaan a.n Fransisca telah masuk…</Text>
                                            <Text caption gray>Info - 29 Januari 2020 13:37 WIB</Text>
                                        </Block>
                                    </Block>

                                </Block>
                            </TouchableWithoutFeedback>
                        ))}
                </Block>
                </Block>
                    </ScrollView>
                    ))}
            </ScrollableTabView>
              </Block>
          </Block>
      </Block>
    );
  }

}