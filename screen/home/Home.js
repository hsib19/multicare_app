import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Badge } from 'react-native-elements';
import { colors } from '../../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Swiper from 'react-native-swiper'
import { apiUrl, apiConfig } from '../../constants/api';
import { Placeholder, PlaceholderLine, Shine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import { connect } from 'react-redux';
import { fetchCart } from '../../redux/actions/Cart';

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  constructor(){
    super();

    this.state = {
        loadingData: true,
        dataMember: '',
        loadingProduct: true,
        listProduct: '',
    }

  }

  componentDidMount(){

    this.props.dataCart();

    this.getData();
    this.getProduct();

  }

  async getData(){

    const userid = await AsyncStorage.getItem('userid');

    axios
    .get(apiUrl + 'main/member?userid='+userid, apiConfig)
    .then((response) => {
      const res = response.data;

      if (res.status) {

        this.setState({
          loadingData: false,
          dataMember: res.data
        });

      } else {

        this.setState({
          loadingData: false,
          dataMember: ''
        });

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

  getProduct(){

    axios
    .get(apiUrl + 'main/product?limit=15', apiConfig)
    .then((response) => {
      const res = response.data;

      if (res.status) {

        this.setState({
          loadingProduct: false,
          listProduct: res.data
        });

      } else {

        this.setState({
          loadingProduct: false,
          listProduct: ''
        });

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

  loadingProduct(){
    return (
      <Block row margin={[0, 20]}>
                  <Block marginRight={20} white>
                    <Placeholder
                      Animation={Shine}
                    >
                      <PlaceholderMedia style={{ width: '100%', height: 120 }} />
                      <PlaceholderLine style={{ width: 110, marginTop: 10}}  />
                      <PlaceholderLine style={{ width: 90, }}  />
                    </Placeholder>
                  </Block>
                  <Block white>
                    <Placeholder
                      Animation={Shine}
                    >
                      <PlaceholderMedia style={{ width: '100%', height: 120 }} />
                      <PlaceholderLine style={{ width: 110, marginTop: 10 }}  />
                      <PlaceholderLine style={{ width: 90 }}  />
                    </Placeholder>
                  </Block>
                </Block>

    )
  }

  
  loadingPromo(){
    return (
      <Block row margin={[0, 20]}>
                  <Block marginRight={20} white>
                    <Placeholder
                      Animation={ShineOverlay}
                    >
                      <PlaceholderMedia style={{ width: '100%', height: 120 }} />
                    </Placeholder>
                  </Block>
                  <Block white>
                    <Placeholder
                      Animation={ShineOverlay}
                    >
                      <PlaceholderMedia style={{ width: '100%', height: 120 }} />
                    </Placeholder>
                  </Block>
                </Block>

    )
  }

  render(){

    const { loadingData, dataMember, loadingProduct, listProduct } = this.state;
    const dataCart  = this.props.items;

    return(
 
         <ScrollView
         style={{ zIndex: 2, backgroundColor: '#f5f5f5' }}
         >

         <StatusBar translucent backgroundColor={"transparent"} barStyle="light-content" />
         
         <Block white style={{ height: 285, backgroundColor: colors.primary }}>
             <Block flex={false} row style={{ position: 'absolute', top: 40, zIndex: 4, left: 10, width: '90%', alignSelf: 'center' }}>
                 <Block flex={4}>
                     <Input 
                         inputStyle={{ fontSize: 12,  }}
                         placeholder="Cari produk yang Anda inginkan"
                         inputContainerStyle={{ backgroundColor: '#fff', borderBottomWidth: 0, borderRadius: 10 }}
                         leftIcon={<Icon name="search1" type="antdesign" color={colors.gray} size={18} />}
                         leftIconContainerStyle={{ paddingLeft: 10 }}
                     />
                 </Block>
                 <Block row flex={1} middle marginTop={13}>
                         <Block>
                     <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Keranjang') }
                     >
                             <Icon name="md-cart" type="ionicon" color={colors.white} />
                             <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                value={dataCart.loading ? 0 : dataCart.data.length}
                                textStyle={{ fontSize: 9 }}
                                badgeStyle={{ borderWidth: 0 }}
                            />
                     </TouchableOpacity>
                         </Block>
                         <Block>
                     <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Notifikasi') }
                     >
                             <Icon name="ios-notifications" type="ionicon" color={colors.white} />
                             <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                value={loadingData ? 0 : dataMember.notif}
                                textStyle={{ fontSize: 9 }}
                                badgeStyle={{ borderWidth: 0 }}
                            />
                     </TouchableOpacity>
                         </Block>
                 </Block>
             </Block>

             <Swiper 
             showsButtons={false}
             dotStyle={{ width: 7, height: 7, alignSelf: 'flex-end' }}
             activeDotStyle={{ width: 30 }}
             activeDotColor={colors.secondary}
             dotColor={colors.white}
             paginationStyle={{ bottom: 10, left: null, right: 10 }}
             >
                {[1, 2, 3 ,4].map((item, index) => (
                    <Block key={index}>
                        <AutoHeightImage 
                            width={width}
                            source={{ uri: 'https://i.postimg.cc/d3twQ9Zb/Slider.png', zIndex:  99 }}
                        />
                    </Block>
                ))}
            </Swiper>
            
         </Block>

         <Block white>
            <Block white row margin={[20, 20]} style={{ elevation: 6, borderRadius: 10, padding: 20 }}>
                <Block white row style={{ borderRightWidth: 1, borderRightColor: '#ddd' }}>
                    <Block flex={false}>
                        <Image 
                            source={require('../../assets/images/money.png')}
                            style={{ width: 30, height: 20 }}
                        />
                    </Block>
                    <Block flex={false} paddingLeft={10}>
                    <Text caption style={{ fontFamily: 'Poppins-Bold' }}>e-Bonus</Text>
                    {loadingData ? 
                        <Block>
                            <Placeholder>
                                <PlaceholderLine />
                            </Placeholder>
                        </Block>
                    :
                    <Text secondary uang value={dataMember.bonus} style={{ fontFamily: 'Poppins-Bold' }} />
                    }
                    </Block>
                </Block>
                <Block row paddingLeft={10} white>
                    <Block flex={false}>
                        <Image 
                            source={require('../../assets/images/points.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    </Block>
                    <Block flex={false} paddingLeft={10}>
                    <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Care Points</Text>
                    {loadingData ? 
                        <Block>
                            <Placeholder>
                                <PlaceholderLine />
                            </Placeholder>
                        </Block>
                    :
                    <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>{dataMember.care_points} Pts</Text>
                    }
                    </Block>
                </Block>
            </Block>
         </Block>

         <Block row padding={[0, 20]} white>
             <Block middle flex={2}>
                 <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }} title secondary>Promo Bulan Ini</Text>
             </Block>
             <Block middle flex={1}>
                 <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Produk') }
                 >
                    <Text small right primary style={{ fontFamily: 'Poppins-Bold' }}>Lihat Semua</Text>
                 </TouchableOpacity>
             </Block>
         </Block>

         <Block paddingVertical={10} white>

         {loadingProduct ? 
            <Block>
                {this.loadingPromo()}
            </Block>
         :
             <FlatList 
                 data={listProduct}
                 keyExtractor={(item, index) => index.toString()}
                 horizontal
                 style={{ paddingLeft: 10 }}
                 showsHorizontalScrollIndicator={false}
                 renderItem={({item}) => 
                    <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('ProdukDetail') }
                        
                    >
                        <Image 
                            source={{uri: 'http://multicare-web.dilokaproject.com/assets/owlcarousel/img/img-02.png'}}
                            style={{ width: 150, height: 120, marginRight: 10, borderRadius: 10 }}
                        />
                    </TouchableWithoutFeedback>
                 }
                 
             /> 
         }
         </Block>

         <Block marginTop={10} row padding={[15, 20]} white>
             <Block middle flex={3}>
                 <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16 }} secondary h3>Rekomendasi Bulan Ini</Text>
             </Block>
             <Block middle flex={1}>
                 <TouchableOpacity>
                    <Text small right primary bold>Lihat Semua</Text>
                 </TouchableOpacity>
             </Block>
         </Block>

         <Block white>
         {loadingProduct ? 
            <Block>
                {this.loadingProduct()}
            </Block>
         :
             <FlatList 
                 data={listProduct}
                 keyExtractor={(item, index) => index.toString()}
                 horizontal
                 style={{ paddingLeft: 10 }}
                 showsHorizontalScrollIndicator={false}
                 renderItem={({item}) => 
                    <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('ProdukDetail', { data: item }) }
                        
                    >
                        <Block margin={[10, 10, 10, 10]} padding={[0, 15, 15, 15]} style={{ backgroundColor: '#fff', elevation: 5, borderRadius: 10, width: 150 }}>
                        <Block>
                            <Image 
                                style={{ width: 130, height: 120, alignSelf: 'center' }}
                                source={{ uri: item.foto }}
                                resizeMode="center"
                            />
                        </Block>
                            <Block marginBottom={10}>
                                <Text secondary caption style={{ fontFamily: 'Poppins-Bold' }}>{ item.nama_produk.length > 27 ? item.nama_produk.substr(0, 27)+"..." : item.nama_produk}</Text>
                            </Block>
                            <Block marginTop={10}>
                                <Text uang style={{ fontFamily: 'Poppins-Bold' }} value={item.harga} caption primary />
                            </Block>
                        </Block>
                    </TouchableWithoutFeedback>
                 }
                 
             /> 
         }
         </Block>

         <Block white marginVertical={10} paddingBottom={20}>

         <Block  row padding={[10, 20]} white>
             <Block middle>
                 <Text style={{ fontFamily: 'Poppins-Bold' }} secondary h3>Kategori Produk</Text>
             </Block>
         </Block>

         <Block 
                white
                style={{ elevation: 4, borderRadius: 10, paddingVertical: 0 }}
                margin={[20, 20, 0, 20]}
             >
             <TouchableWithoutFeedback
                        
                        >
                          <Block row>
                              <Block flex={1}>
                                  <Image 
                                      source={require('../../assets/images/bg_kategori.png')}
                                      style={{ width: '100%', height: 85 }}
                                  />
                                  <Image 
                                      source={require('../../assets/images/obat.png')}
                                      style={{ width: 46, height: 51, position: 'absolute', top: 20, left: 27 }}
                                  />
                              </Block>
                              <Block flex={2} middle paddingRight={10} paddingLeft={20}>
                                  <Text h3 secondary style={{ paddingBottom: 5, fontFamily: 'Poppins-Bold' }}>Health Focus</Text>
                                  <Text caption gray>Mengandung bahan alamai dan telah teruji secara klinis</Text>
                              </Block>
                          </Block>
                        </TouchableWithoutFeedback>
             </Block>

             <Block 
                white
                style={{ elevation: 4, borderRadius: 10, paddingVertical: 0 }}
                margin={[20, 20, 0, 20]}
             >
             <TouchableWithoutFeedback
                        
                        >
                          <Block row>
                              <Block flex={1}>
                                  <Image 
                                      source={require('../../assets/images/bg_kategori.png')}
                                      style={{ width: '100%', height: 85 }}
                                  />
                                  <Image 
                                      source={require('../../assets/images/woman.png')}
                                      style={{ width: 40, height: 51, position: 'absolute', top: 20, left: 27 }}
                                  />
                              </Block>
                              <Block flex={2} middle paddingRight={10} paddingLeft={20}>
                                  <Text h3 secondary style={{ paddingBottom: 5, fontFamily: 'Poppins-Bold' }}>Beauty Focus</Text>
                                  <Text caption gray>Memebuhi standard mutu dan terdaftar di Badan POM-RI</Text>
                              </Block>
                          </Block>
                        </TouchableWithoutFeedback>
             </Block>

         </Block>

         </ScrollView>
    );
  }

}

const mapStateToProps = (state, ownProps) => {

    return {
        items: state.dataCart
    }
  
  }
  
  const mapDispatchToProps = (dispatch) => {
  return {
      dataCart: () => dispatch(fetchCart()),
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);