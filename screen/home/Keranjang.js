import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity, Keyboard } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Badge } from 'react-native-elements';
import { colors } from '../../constants/theme';
import { connect } from 'react-redux';
import { fetchCart, updateCart } from '../../redux/actions/Cart';
import { Placeholder, Shine, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';

const { width } = Dimensions.get('screen');

class Keranjang extends React.Component {
  constructor(){
    super();
  }

  componentDidMount(){
    this.props.dataCart();
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

  render(){

    const dataCart  = this.props.items;

    if(dataCart.loading){
      return (
        <Block white>
          {this.loadingContent(6)}
        </Block>
      )
    }

    return(
      
      <Block white>
          <ScrollView
        style={{ backgroundColor: '#fff' }}
      >
          <StatusBar barStyle="dark-content" />

          <Block marginTop={20}>

          {dataCart.data.length == 0 ?
            <Block middle center>
              <Block marginBottom={20}>
                <Icon size={110} name="handbag" color={colors.primary} type="simple-line-icon" />
              </Block>
              <Text>Keranjang anda kosong</Text>
            </Block>
          :

          <Block>
            {dataCart.data.map((item, index) => 
              <Block key={index} row margin={[0, 20, 20, 20]} style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 20 }}>
                  <Block flex={1}>
                  <Image
                        source={{ uri: item.foto }}
                        style={{ width: '100%', height: 100, borderRadius: 10 }}
                        resizeMode="center"
                    />
                  </Block>
                  <Block flex={2} paddingLeft={10}>
                      <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>{item.nama_produk}</Text>
                      <Text primary style={{ marginVertical: 5 }} value={item.harga_normal} uang />

                      <Block row style={{ width: 100, position: 'relative', right: 10 }} marginBottom={10}>
                    <Block middle>
                      <TouchableOpacity
                        onPress={() => this.props.updateCart(item, 'dell') }
                      >
                        <Icon name="minuscircle" type="antdesign" size={20} color={colors.primary} />
                      </TouchableOpacity>
                    </Block>
                    <Block middle>
                      <Text center>{item.qty}</Text>
                    </Block>
                    <Block middle>
                      <TouchableOpacity                       
                      onPress={() => this.props.updateCart(item, 'add') }
                      >
                        <Icon name="pluscircle" type="antdesign" size={20} color={colors.primary} />
                      </TouchableOpacity>
                    </Block>
                  </Block>

                      <TouchableOpacity>
                          <Text small black>Tambahkan Catatan</Text>
                      </TouchableOpacity>
                  </Block>
              </Block>
            )}
          </Block>


            }

          </Block>

          <Block paddingTop={40} />

      </ScrollView>

      <ScrollView
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: 20, backgroundColor: '#fff', elevation: 9 }}
      >
        <Block row>
          <Block>
              <Text style={{ fontSize: 13, fontFamily: 'Poppins-Bold' }}>Total Order</Text>
              <Text uang primary caption value={dataCart.total_order} />
          </Block>
          <Block>
          <Button 
              title={dataCart.data.length == 0 ? "Mulai Belanja" : "Proses Pesanan" }
              titleStyle={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}
              buttonStyle={{ backgroundColor: colors.primary, borderRadius: 10 }}
              onPress={() => this.props.navigation.navigate('Pengiriman') }
          />
          </Block>
        </Block>
      </ScrollView>

      </Block>

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
    updateCart: (item, jenis) => dispatch(updateCart(item, jenis)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Keranjang)