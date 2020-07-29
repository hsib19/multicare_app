import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Share,
  ToastAndroid,
} from 'react-native';

import {Block, Text} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import {Button, Input, Icon} from 'react-native-elements';
import {colors} from '../../constants/theme';
import Swiper from 'react-native-swiper';

import axios from 'axios';
import { apiUrl, apiConfig } from '../../constants/api';


import RBSheet from 'react-native-raw-bottom-sheet';
import { Placeholder, Shine, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import { connect } from 'react-redux';
import { updateCart } from '../../redux/actions/Cart';

const {width, height} = Dimensions.get('screen');

class ProdukDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      loadingProduct : true,
      dataProduct : ''
    }

  }

  componentDidMount(){
    this.props.navigation.setOptions({
      headerShown: false
    });

    this.getData()

  }

  getData(){

      const { id } = this.props.route.params.data;

      axios
    .get(apiUrl + 'main/product?id='+id, apiConfig)
    .then((response) => {
      const res = response.data;

      if (res.status) {

        this.setState({
          loadingProduct: false,
          dataProduct: res.data
        });

      } else {

        this.setState({
          loadingProduct: false,
          dataProduct: ''
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

  
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'http://multicare-web.dilokaproject.com/produk/'+this.state.dataProduct.nama_produk.replace(/\s/g, '-'),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



  render() {

    const { loadingProduct, dataProduct } = this.state;

    if(loadingProduct){
      return(
        <Block white>
                <Placeholder
                Animation={Shine}
                >
                    <PlaceholderMedia style={{ width: '100%', height: 250 }} />
                    <Block margin={[0, 20]}>
                        <PlaceholderLine style={{ marginTop: 10, width: '60%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '30%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '80%' }} />

                    </Block>

                    <Block marginTop={100} margin={[20, 20]}>
                        <PlaceholderLine style={{ marginTop: 10, width: '60%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '30%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '80%' }} />

                    </Block>

                    <Block marginTop={80} margin={[20, 20]}>
                        <PlaceholderLine style={{ marginTop: 10, width: '60%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '30%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '80%' }} />

                    </Block>

                    <Block marginTop={80} margin={[20, 20]}>
                        <PlaceholderLine style={{ marginTop: 10, width: '60%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '30%' }} />
                        <PlaceholderLine style={{ marginTop: 0, width: '80%' }} />

                    </Block>

                </Placeholder>
            </Block>
      )
    }

    const addItem = {
      id_product: dataProduct.id,
      kode_produk: dataProduct.id,
      harga_normal: dataProduct.harga,
      nama_produk: dataProduct.nama_produk,
  }

    return (
      <Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex={false}>
            <Block flex={false}>
              <Block
                row
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 20,
                  width: '100%',
                  zIndex: 100,
                  alignSelf: 'center',
                }}
                padding={20}>
                <Block>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack() }
                  >
                    <Icon
                      name="arrow-left"
                      size={30}
                      type="feather"
                      iconStyle={{alignSelf: 'flex-start'}}
                    />
                  </TouchableOpacity>
                </Block>
                <Block>
                  <TouchableOpacity
                    onPress={this.onShare}
                  >
                    <Icon
                      name="sharealt"
                      type="antdesign"
                      iconStyle={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </Block>
              </Block>
              <Image
                source={{ uri: dataProduct.foto }}
                style={{ width, height: 300 }}
                resizeMode="center"
              />
            </Block>
          </Block>
          <Block flex={false} margin={[10, 20]}>
            <Block row flex={false}>
              <Block flex={false} style={{width: '80%'}}>
                <Text secondary h3 style={{ fontFamily: 'Poppins-Bold' }}>
                  {dataProduct.nama_produk}
                </Text>
              </Block>
              <Block flex={false} style={{width: '20%'}}>
                <Text caption right secondary>
                  SKU {dataProduct.sku}
                </Text>
              </Block>
            </Block>
            <Block
              flex={false}
              marginTop={10}
              row
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingBottom: 20,
              }}>
              <Text uang value={dataProduct.harga} primary style={{ fontFamily: 'Poppins-Bold' }} h3 />
              {/* <Text
                uang
                value={550000}
                style={{textDecorationLine: 'line-through', paddingLeft: 10}}
                gray
                bold
                h2
              /> */}
            </Block>

            <Block flex={false}>
              <Block marginVertical={10}>
                <Text bold secondary>
                  Deskripsi Produk
                </Text>
              </Block>
              <Block>
                <Text gray>
                  {dataProduct.deskripsi}
                </Text>
              </Block>
            </Block>

            <Block flex={false}>

              <TouchableOpacity onPress={() => this.RBSheet.open()}>
                <Text primary>Baca Selengkapnya</Text>
              </TouchableOpacity>
            </Block>
          </Block>

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={height}
            openDuration={250}
            customStyles={{
              container: {},
            }}>
            <Block flex={false} padding={20}>
              <Block
                row
                flex={false}
                white
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  paddingBottom: 20,
                }}>
                <Block flex={false} marginRight={20}>
                  <TouchableOpacity
                    onPress={() => this.RBSheet.close()}
                  >
                    <Icon name="close" type="antdesign" />
                  </TouchableOpacity>
                </Block>
                <Block flex={false}>
                  <Text secondary h2 bold>
                    Deskripsi Produk
                  </Text>
                </Block>
              </Block>
              <Block flex={false}>

              <Text>{dataProduct.deskripsi}</Text>

              </Block>
            </Block>
          </RBSheet>

          <Block marginBottom={100} />
        </ScrollView>
        <ScrollView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: 10,
            backgroundColor: '#fff',
            elevation: 11,
          }}>
          <Block white row>
            <Block row flex={false} center style={{width: '40%'}}>
              <Block marginRight={15}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.secondary,
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  <Icon
                    name="comment-processing-outline"
                    type="material-community"
                    color={colors.secondary}
                    size={26}
                  />
                </TouchableOpacity>
              </Block>
              <Block marginRight={15}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Keranjang') }
                  style={{
                    borderWidth: 1,
                    borderColor: colors.secondary,
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  <Icon
                    name="shoppingcart"
                    type="antdesign"
                    color={colors.secondary}
                    size={26}
                  />
                </TouchableOpacity>
              </Block>
            </Block>
            <Block row flex={false} style={{width: '60%'}}>
              <Button
                onPress={() => {
                  this.props.updateCart(addItem, 'add')
                  ToastAndroid.show('Berhasil ditambahkan ke keranjang!', ToastAndroid.SHORT);
                } }
                title="Beli"
                titleStyle={{fontSize: 13, fontFamily: 'Poppins-Bold'}}
                buttonStyle={{backgroundColor: colors.primary, borderRadius: 10}}
                containerStyle={{width: '100%'}}
              />
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
return {
    updateCart: (item, jenis) => dispatch(updateCart(item, jenis)),
}
}

export default connect(null, mapDispatchToProps)(ProdukDetail);