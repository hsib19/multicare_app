import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Overlay } from 'react-native-elements';
import { colors } from '../../constants/theme';

const { width } = Dimensions.get('screen');

export default class StatusPesanan extends React.Component {
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

         <Overlay
            isVisible={modalDetail}
            animationType="fade"
            style={{ width: width-40 }}
            overlayStyle={{ width: width-40 }}
            onBackdropPress={() => this.setState({ modalDetail: false }) }
         >
             <Block flex={false} padding={10}>
                    <Block row flex={false} style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                        <Block flex={1}>
                            <Text secondary>Detail Pesanan</Text>
                        </Block>
                        <Block flex={1}>
                            <TouchableOpacity
                                onPress={() => this.setState({ modalDetail: false }) }
                            >
                                <Icon name="close" type="antdesign" iconStyle={{ alignSelf: 'flex-end' }} />
                            </TouchableOpacity>
                        </Block>
                    </Block>

                    <Block flex={false} style={{borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10}}>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>VitaCare Super Maitake MD-Fraction x 1</Text>
                            </Block>
                            <Block flex={1}>
                                <Text numeric right value={450000} />
                            </Block>
                        </Block>
                    </Block>

                    <Block flex={false} style={{borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10}}>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Ongkir</Text>
                            </Block>
                            <Block flex={1}>
                                <Text numeric right value={18000} />
                            </Block>
                        </Block>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Sub - Total</Text>
                            </Block>
                            <Block flex={1}>
                                <Text numeric right value={468000} />
                            </Block>
                        </Block>
                    </Block>

                    <Block flex={false} style={{borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10}}>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Diskon</Text>
                            </Block>
                            <Block flex={1}>
                                <Text secondary numeric right value={18000} />
                            </Block>
                        </Block>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Potongan Voucher</Text>
                            </Block>
                            <Block flex={1}>
                                <Text secondary numeric right value={468000} />
                            </Block>
                        </Block>
                        <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Potongan iBonus</Text>
                            </Block>
                            <Block flex={1}>
                                <Text secondary numeric right value={468000} />
                            </Block>
                        </Block>
                    </Block>

                    <Block row flex={false}>
                            <Block flex={1} row>
                                <Text>Total</Text>
                            </Block>
                            <Block flex={1}>
                                <Text secondary numeric right value={318000} />
                            </Block>
                        </Block>

             </Block>
         </Overlay>

         <Block padding={20}>
             <Block row>
                 <Block style={{ backgroundColor: status >= 0 ? colors.primary :  "#E3E3E3", borderRadius: 10 }} padding={10} marginRight={10}>
                     <Image 
                         source={require('../../assets/images/pending.png')}
                         style={{ width: 30, height: 30, alignSelf: 'center' }}
                     />
                 </Block>
                 <Block style={{ backgroundColor: status >= 1 ? colors.primary : "#E3E3E3", borderRadius: 10 }} padding={10} marginRight={10}>
                     <Image 
                         source={require('../../assets/images/diproses.png')}
                         style={{ width: 30, height: 30, alignSelf: 'center' }}
                     />
                 </Block>
                 <Block style={{ backgroundColor: status >= 2 ? colors.primary : "#E3E3E3", borderRadius: 10 }} padding={10} marginRight={10}>
                     <Image 
                         source={require('../../assets/images/dikirim.png')}
                         style={{ width: 55, height: 26, alignSelf: 'center' }}
                     />
                 </Block>
                 <Block style={{ backgroundColor: status >= 3 ? colors.primary : "#E3E3E3", borderRadius: 10 }} padding={10} marginRight={0}>
                     <Image 
                         source={require('../../assets/images/diterima.png')}
                         style={{ width: 30, height: 30, alignSelf: 'center' }}
                     />
                 </Block>
             </Block>

             <Block marginTop={20} style={{ borderTopWidth: 1, borderTopColor: '#ddd', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                 <Block row>
                     <Block flex={2}>
                         <Text>Nomor Invoice</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text>MRC98427342374</Text>
                     </Block>
                 </Block>
                 <Block row>
                     <Block flex={2}>
                         <Text>Status</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text>Menunggu Pembayaran</Text>
                     </Block>
                 </Block>

                 <Block middle row margin={[20, 0]} paddingHorizontal={20} style={{ backgroundColor: '#DFECD0', borderRadius: 10, paddingVertical: 10 }}>
                     <Icon size={15} color={colors.secondary} iconStyle={{ marginRight: 10 }} name="notifications" />
                     <Text caption>{status == 0 ? "Bayar sebelum 2 Maret 2020, 17:00 WIB" : "Rincian pesanan sudah diterima, pesanan Anda sedang di proses. "}</Text>
                 </Block>

                 <Block row>
                     <Block flex={2}>
                         <Text>Total</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text primary uang value={112000} />
                     </Block>
                 </Block>
                 <Block row>
                     <Block flex={2}>
                         <Text>Tanggal Beli</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text>1 Maret 2020</Text>
                     </Block>
                 </Block>
                 <Block row>
                     <Block flex={2}>
                         <Text>Metode</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text>BCA Virtual Account</Text>
                     </Block>
                 </Block>
                 <Block row>
                     <Block flex={2}>
                         <Text>Nomor Rek.</Text>
                     </Block>
                     <Block flex={1}>
                         <Text center>:</Text>
                     </Block>
                     <Block flex={3}>
                         <Text>098723842834</Text>
                     </Block>
                 </Block>
                 <Block row margin={[20, 0]}>
                 {status == 0 ?

                    <Block>
                    <Block marginRight={10}>
                         <Button 
                             title="Cara Pembayaran"
                             titleStyle={{ fontSize: 13 }}
                             buttonStyle={{ backgroundColor: colors.primary, borderRadius: 10, borderWidth: 1, borderColor: colors.white }}
                         />
                     </Block>
                     <Block marginRight={0}>
                         <Button 
                             title="Batalkan Transaksi"
                             titleStyle={{ fontSize: 13, color: colors.primary }}
                             buttonStyle={{ backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.primary }}
                         />
                     </Block>
                     </Block>
                     
                 : status == 1 ?
       
                     <Block row>
                     <Block marginRight={0}>
                         <Button 
                            onPress={() => this.setState({ modalDetail: true }) }
                             title="Detail Pesanan"
                             titleStyle={{ fontSize: 13, color: colors.primary }}
                             buttonStyle={{ backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.primary }}
                         />
                     </Block>
                     <Block></Block>
                     </Block>
 
                     : status == 3 ?

                     <Block row>
                    <Block marginRight={10}>
                         <Button 
                             title="Lacak Pengiriman"
                             titleStyle={{ fontSize: 13 }}
                             buttonStyle={{ backgroundColor: colors.primary, borderRadius: 10, borderWidth: 1, borderColor: colors.white }}
                         />
                     </Block>
                     <Block marginRight={0}>
                         <Button 
                            onPress={() => this.setState({ modalDetail: true }) }
                             title="Detail Pesanan"
                             titleStyle={{ fontSize: 13, color: colors.primary }}
                             buttonStyle={{ backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.primary }}
                         />
                     </Block>
                     </Block>

                     : status == 4 ?

<Block row>
<Block marginRight={10}>
    <Button 
                            onPress={() => this.props.navigation.navigate('BeriUlasan') }
        title="Beri Ulasan"
        titleStyle={{ fontSize: 13 }}
        buttonStyle={{ backgroundColor: colors.primary, borderRadius: 10, borderWidth: 1, borderColor: colors.white }}
    />
</Block>
<Block marginRight={0}>
    <Button 
                            onPress={() => this.setState({ modalDetail: true }) }
        title="Detail Pesanan"
        titleStyle={{ fontSize: 13, color: colors.primary }}
        buttonStyle={{ backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.primary }}
    />
</Block>
</Block> : null
                 }
                 </Block>
             </Block>

             <Block marginTop={20} style={{ backgroundColor: '#DFECD0', padding: 15, borderRadius: 10 }}>
                 <Text secondary bold>Kabar Gembira !</Text>
                 <Text caption>Manfaatkan Business Throught</Text>
                 <Text caption>Recommendation (BTR) Multicare !</Text>
                 <Text caption>Info lebih lanjut klik link video berikut</Text>
                 <Text bold caption secondary>https://www.youtube.com/watch?v=asisfksdfkjh</Text>
             </Block>

         </Block>
         
         </ScrollView>

    );
  }

}