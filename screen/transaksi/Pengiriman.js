import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Block, Text} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import {Button, Input, Icon, Badge, CheckBox} from 'react-native-elements';
import {colors} from '../../constants/theme';

import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';
import { fetchCart } from '../../redux/actions/Cart';
import { Placeholder, Shine, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import axios from 'axios';
import { apiUrl, apiConfig } from '../../constants/api';

const {width, height} = Dimensions.get('screen');

class Pengiriman extends React.Component {
  constructor() {
    super();

    this.state = {
      titleModal: '',
      payment_list: {},
      showModalBottom: false,
      metode_bayar: {
        id: 3,
        payment_id: 29,
        nama: "BCA",
        img: "https://api.laukita.co.id/img/icon/bayar/bca.png",
        jenis: "Transfer Virtual Account",
        status: "1"
      }
    };
  }

  componentDidMount() {

    this.props.dataCart();
    this.getPayment();

    //   this.props.navigation.setOptions({
    //    tit
    //   });
  }

  
  getPayment() {

    axios
      .get(apiUrl+'icentive/main/metode_bayar', apiConfig)
      .then((response) => {
        const res = response.data;

        this.setState({
          loadingPayment: false,
          payment_list: res.data
        })

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  loadingContent(qty) {
    let table = [];
    for (let i = 0; i < qty; i++) {
      table.push(
        <Block white key={i} margin={[0, 20]} style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 20, marginBottom: 20 }}>
            <Placeholder
                Animation={Shine}
            >
                <Block row>
                    <Block flex={false}>
                        <PlaceholderMedia />
                    </Block>
                    <Block flex={false} paddingLeft={20}>
                        <PlaceholderLine style={{ width: 180 }} />
                        <PlaceholderLine style={{ width: 70 }} />
                        <PlaceholderLine style={{ width: 130 }} />
                    </Block>
                </Block>
            </Placeholder>
       </Block>
      );
    }
    return table;
  }

  render() {

    const {dataCart, dataCheckout}  = this.props.items;

    const { loadingPayment, payment_list, metode_bayar, showModalBottom } = this.state;
    return (
      <Block>
        <ScrollView style={{backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}
        >
          <StatusBar barStyle="dark-content" />

          <Block marginTop={20}>
            <Block margin={[0, 20, 20, 20]}>
              <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>
                Ringkasan Pesanan
              </Text>
            </Block>

            {
              dataCart.loading ?

              <Block>
                {this.loadingContent(2)}
              </Block>

              :

              dataCart.data.map((item, index) => 
                <Block
                key={index}
                  row
                  margin={[0, 20, 20, 20]}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    paddingBottom: 20,
                  }}>
                  <Block flex={1}>
                    <Image
                      source={{ uri: item.foto }}
                      style={{width: 100, height: 80, borderRadius: 10}}
                      resizeMode="center"
                    />
                  </Block>
                  <Block flex={2} paddingLeft={10}>
                    <Text secondary caption style={{ fontFamily: 'Poppins-Bold' }}>
                      {item.nama_produk}
                    </Text>
                    <Text primary caption style={{marginVertical: 5}} value={item.harga_normal} uang />
                    <Text small>{item.qty} Item</Text>
                  </Block>
                </Block>
            )}


          </Block>

          <Block marginTop={0}>
            <Block margin={[0, 20, 20, 20]} row>
              <Block>
                <Text style={{ fontFamily: 'Poppins-Bold' }} secondary>
                  Alamat Pengiriman
                </Text>
              </Block>
              <Block middle>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('AlamatList') }
                >
                <Text right small bold primary>{dataCheckout.alamat == null ? "Buat Alamat" : "Ubah"}</Text>
                  {/* <Icon
                    name="settings"
                    iconStyle={{alignSelf: 'flex-end'}}
                    color={colors.primary}
                    size={16}
                  /> */}
                </TouchableOpacity>
              </Block>
            </Block>

            <Block
              row
              margin={[0, 20, 20, 20]}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingBottom: 20,
              }}>
              <Block flex={false}>
                <Icon name="home" type="feather" color={colors.primary} />
              </Block>
              <Block flex={false} paddingLeft={10}>
              {dataCheckout.alamat == null ?

              <Block middle>
                    <Text caption>Alamat belum dipilih</Text>
              </Block>

              :
                <Block>
                  <Text caption>{dataCheckout.alamat.nama_lengkap} ({dataCheckout.alamat.no_hp})</Text>
                  <Text small gray>
                  {dataCheckout.alamat.alamat} {'\n'}{'\n'}
                  {dataCheckout.alamat.provinsi}, 
                  {' '+dataCheckout.alamat.kota}, 
                  {' '+dataCheckout.alamat.kecamatan}, 
                  {' '+dataCheckout.alamat.keluhan}, 
                  {' '+dataCheckout.alamat.kodepos}.
                  </Text>
                </Block>
              }
              </Block>
            </Block>

            <Block
              row
              margin={[0, 20, 20, 20]}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingBottom: 20,
              }}>
              <Block flex={false}>
                <Icon name="truck" type="feather" color={colors.primary} />
              </Block>
              <Block paddingLeft={10} row>
                <Block>
                  <Text caption bold>
                    Pengiriman
                  </Text>
                  <Block row>
                    <Text small gray>
                      Gosend -{' '}
                    </Text>
                    <Text small gray uang value={18000} />
                  </Block>
                </Block>
                <Block>
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.open();
                      this.setState({titleModal: 'Kurir'});
                    }}>
                    <Text right primary caption bold>
                      Ubah
                    </Text>
                  </TouchableOpacity>
                </Block>
              </Block>
            </Block>
          </Block>

          <Block marginTop={0}>
            <Block margin={[0, 20, 20, 20]}>
              <Text style={{ fontFamily: 'Poppins-Bold' }} secondary>
                Metode Pembayaran
              </Text>
            </Block>

            <Block
              row
              margin={[0, 20, 20, 20]}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                paddingBottom: 20,
              }}>
              <Block flex={false}>
                <Image
                  source={{
                    uri:
                    metode_bayar.img,
                  }}
                  style={{width: 50, height: 20}}
                />
              </Block>
              <Block paddingLeft={10} row>
                <Block middle>
                  <Text bold>
                    {metode_bayar.nama}
                  </Text>
                </Block>
                <Block>
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.open();
                      this.setState({titleModal: 'Metode Pembayaran'});
                    }}>
                    <Text right primary caption bold>
                      Ubah
                    </Text>
                  </TouchableOpacity>
                </Block>
              </Block>
            </Block>
          </Block>

          

          <TouchableOpacity
          onPress={() => {
                                this.RBSheet.open()
                                this.setState({ titleModal: 'Voucher' })
                            }}
          >
            <Block
                margin={[0, 20]}
                row
                style={{
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 10,
                borderRadius: 10,
                }}>
                <Icon name="percent" type="feather" color={colors.secondary} />
                <Block middle paddingLeft={10} row>
                <Block flex={2} middle>
                    <Text caption>Makin hemat pakai promo</Text>
                </Block>
                <Block flex={1} middle>
                    <Icon
                    name="right"
                    type="antdesign"
                    size={16}
                    iconStyle={{alignSelf: 'flex-end'}}
                    />
                </Block>
                </Block>
            </Block>
          </TouchableOpacity>

          <Block marginBottom={100} />

          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={height}
            openDuration={250}
            customStyles={{}}>
            <Block flex={false}>
              <Block row flex={false} padding={20} white style={{elevation: 6}}>
                <Block flex={false} paddingRight={20}>
                  <TouchableOpacity onPress={() => this.RBSheet.close()}>
                    <Icon name="close" type="antdesign" />
                  </TouchableOpacity>
                </Block>
                <Block flex={false}>
                  <Text secondary h3>
                    {this.state.titleModal}
                  </Text>
                </Block>
              </Block>
              <Block flex={false}>
                <ScrollView>
                  { this.state.titleModal == "Voucher" ?

                  <Block margin={[0, 20]}>

                      <Block
                        row
                        paddingVertical={20}
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#ddd',
                        }}>
                        <Block flex={false} marginRight={10}>
                          <TouchableOpacity>
                            <Block
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: '#ddd',
                              }}
                            />
                          </TouchableOpacity>
                        </Block>
                        <Block flex={false} row>
                          <Block flex={false} row>
                          <Image
                              source={require('../../assets/images/voucher.png')}
                              style={{width: 32, height: 21, marginRight: 10}}
                            />
                            <Text>Bebas Ongkir</Text>
                          </Block>
                        </Block>
                      </Block>
                    </Block>

                  :
                      this.state.titleModal == 'Kurir' ? (
                    <Block margin={[0, 20]}>

                      <Block
                        row
                        paddingVertical={20}
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#ddd',
                        }}>
                          <TouchableOpacity>
                        <Block flex={false} row>
                          <Block flex={false} row style={{width: '50%'}}>
                          <Block
                             flex={false}
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: '#ddd',
                              }}
                            />
                          <Block flex={false} paddingLeft={10}>
                            <Text style={{ fontFamily: 'Poppins-Bold' }}>Jet Express</Text>
                          </Block>
                          </Block>
                          <Block flex={false} style={{width: '50%'}}>
                            <Text right value={20000} uang />
                          </Block>
                        </Block>

                        </TouchableOpacity>
                      </Block>
                    </Block>
                  ) : (
                    <Block margin={20}>

                    

                      <Block
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#ddd',
                        }}>

                          { !loadingPayment &&
                            
                            Object.keys(payment_list).map((item, index)=> 
                            <Block key={index} marginBottom={20}>
                              <Text secondary bold>
                                {item}
                              </Text>
                              { payment_list[item].map((dataItem, indexItem) => 

                                    <TouchableOpacity
                                     key={indexItem}
                                      onPress={() => {
                                        this.setState({ metode_bayar: dataItem,  })
                                        this.RBSheet.close()
                                        } }
                                    >
                                <Block row paddingTop={20}>
                                  <Block flex={false} marginRight={10}>
                                      <Block
                                        style={{
                                          width: 20,
                                          height: 20,
                                          backgroundColor: '#fff',
                                          borderRadius: 20,
                                          borderWidth: 2,
                                          borderColor: metode_bayar.id == dataItem.id ? colors.primary : '#ddd',
                                        }}
                                      />
                                  </Block>
                                  <Block flex={false} row>
                                  <Block flex={false}>
                                      <Image
                                        source={{
                                          uri:
                                          dataItem.img,
                                        }}
                                        style={{width: 60, height: 20}}
                                        resizeMode="center"
                                      />
                                    </Block>
                                  <Block flex={false} paddingLeft={10}>
                                    <Text bold>{dataItem.nama}</Text>
                                  </Block>
                                  </Block>
                                </Block>

                                    </TouchableOpacity>
                              ) }
                            </Block>
                          )}                

                        
                      </Block>                   

                      
                    </Block>
                  )}
                </ScrollView>
              </Block>
            </Block>
          </RBSheet>
        </ScrollView>

        <ScrollView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: 20,
            backgroundColor: '#fff',
            elevation: 9,
          }}>
          <Block>
          <Block row>
            <Block>
              <Text gray caption>
                Total Bayar
              </Text>
              <Block row>
                <Text uang bold value={133000} />
                <TouchableOpacity
                onPress={() => this.setState({ showModalBottom: !showModalBottom }) }
                >
                  <Icon
                    size={22}
                    iconStyle={{paddingLeft: 5}}
                    name="keyboard-arrow-down"
                  />
                </TouchableOpacity>
              </Block>
            </Block>
            <Block>
              <Button
                title="Bayar"
                titleStyle={{fontSize: 16}}
                buttonStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                }}
              />
            </Block>
          </Block>

          {showModalBottom &&
            <Block marginTop={10} style={{ borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 20 }}>
            <Block row>
              <Block>
                <Text>Subtotal</Text>
              </Block>
              <Block>
                <Text right uang value={10000} />
              </Block>
            </Block>

            <Block row>
              <Block>
                <Text>Ongkir</Text>
              </Block>
              <Block>
                <Text right uang value={10000} />
              </Block>
            </Block>

            <Block row>
              <Block>
                <Text>Diskon</Text>
              </Block>
              <Block>
                <Text right uang value={10000} />
              </Block>
            </Block>
            
            <Block row>
              <Block>
                <Text style={{ fontFamily: 'Poppins-Bold' }}>Total Order</Text>
              </Block>
              <Block>
                <Text style={{ fontFamily: 'Poppins-Bold' }} right uang value={10000} />
              </Block>
            </Block>

          </Block>
          }

          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
      items: state
  }

}

const mapDispatchToProps = (dispatch) => {
return {
  dataCart: () => dispatch(fetchCart()),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pengiriman);