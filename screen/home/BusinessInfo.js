import React from 'react';
import { StyleSheet, StatusBar, Dimensions, TouchableWithoutFeedback, Image, TouchableOpacity, FlatList } from 'react-native';

import { Block, Text } from '../../components';
import { ScrollView } from 'react-native-gesture-handler';
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, Input, Icon, Badge, Avatar, CheckBox } from 'react-native-elements';
import { colors } from '../../constants/theme';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Transaksi from './Transaksi';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('screen');

export default class BusinessInfo extends React.Component {
  constructor(){
    super();

    this.state = {
        activeTab: 'Transaksi',
        activeTabNet: 'Network Saya',
        activeTabCare: 'Penukaran'
    }

  }

  componentDidMount(){
      this.props.navigation.setOptions({
          headerTitle: () => (
              <Block marginTop={20} marginRight={10}>
                  <Input 
                        inputStyle={{ fontSize: 12 }}
                        placeholder="Cari produk yang Anda inginkan"
                        inputContainerStyle={{ backgroundColor: '#F8F8F8', borderBottomWidth: 0, borderRadius: 10, height: 40 }}
                        leftIcon={<Icon name="search1" type="antdesign" color={colors.gray} size={16} />}
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

    const { activeTab, activeTabNet, activeTabCare } = this.state;

    const tabsList = [
        {
            id: 1,
            nama: 'Transaksi'
        },
        {
            id: 2,
            nama: 'Network'
        },
        {
            id: 3,
            nama: 'Incentive'
        },
        {
            id: 4,
            nama: 'Tabungan Bonus'
        },
        {
            id: 5,
            nama: 'Care Point'
        }
    ]

    const tabsNetwork = [
        {
            id: 1,
            nama: 'Network Saya'
        },
        {
            id: 2,
            nama: 'Network Tree'
        }
    ]

    const tabsCare = [
        {
            id: 1,
            nama: 'Penukaran'
        },
        {
            id: 2,
            nama: 'Riwayat'
        },
        {
            id: 3,
            nama: 'Status'
        }
    ]

    return(
      <Block white>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
          <Block flex={false} padding={[20, 0, 0, 0]} white style={{ elevation: 0, paddingBottom: 0 }}>
              <FlatList 
                  data={tabsList}
                  horizontal
                  style={{ paddingHorizontal: 15 }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => 

                    <TouchableOpacity
                        style={{ paddingRight: 20, borderBottomWidth: 2, borderBottomColor: item.nama == activeTab ? colors.primary : '#ddd', paddingBottom: 10 }}
                        onPress={() => this.setState({ activeTab: item.nama }) }
                    >
                        <Text center style={{ color: item.nama == activeTab ? colors.primary : colors.gray }} >{item.nama}</Text>
                    </TouchableOpacity>

                  }
              />
        </Block>
          <ScrollView
        style={{ backgroundColor: '#fff' }}
      >

{ activeTab == "Care Point" ? 
<Block>

<Block margin={20}>
           <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>Care Point</Text>
       </Block> 

       <Block row margin={[0, 20]}>
       { tabsCare.map((item, index) => 

<Block key={index}>
    <TouchableOpacity
      style={{ marginRight: 10, backgroundColor: activeTabCare != item.nama ? colors.white : colors.primary, padding: 5, borderRadius: 5, borderWidth: 1, borderColor: activeTabCare == item.nama ? colors.white : colors.primary }}
      onPress={() => this.setState({ activeTabCare: item.nama }) }
    >
          <Text center color={activeTabCare == item.nama ? colors.white : colors.primary} caption>{item.nama}</Text>
    </TouchableOpacity>
</Block>

) }


       </Block>

       <Block margin={[0, 0]}>
       {activeTabCare == "Penukaran" ? 
<Block marginVertical={10}>
    
    <Block paddingLeft={20}>
        <Text style={{ fontFamily: "Poppins-Bold" }}>Penukaran Care Point</Text>
        <Text caption gray>Anda dapat menukarkan Care Point Anda dengan berbagai hadiah menarik</Text>  
    </Block>

    <Block>
    
    <FlatList 
        data={[1,2,3,4,5]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10 }}
        renderItem={({item}) => 

        <Block marginTop={10} flex={false} style={{ width: width/3 }}>
            <Block style={{ borderRightWidth: 1, borderRightColor: '#ddd', paddingRight: 0}}>
                <Block padding={[0, 10, 10, 10]}>
                <Text center caption secondary>Samsung Galaxy A51</Text>
                </Block>
                <Image 
                    source={{ uri: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a51-sm-a515-1.jpg' }}
                    style={{ width: 60, height: 60, alignSelf: 'center' }}
                />
            <Block marginTop={10} middle row>
                <Text center primary numeric value={500000} /> 
                <Text primary>CP</Text>
            </Block>
            </Block>
            <Block center middle>
                <CheckBox 
                    title="Pilih"
                    textStyle={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}
                    containerStyle={{ paddingLeft: 0, marginLeft: 0, backgroundColor: 'transparent', borderWidth: 0 }}
                />
            </Block>
        </Block>

        }
    />

    <Block margin={[0, 20]}>
        <Block marginBottom={10} style={{ backgroundColor: '#DFECD0', borderRadius: 5 }} padding={10}>
            <Text caption>Jumlah penukaran Care Point : <Text primary> 1.000.000 CP</Text></Text>
        </Block>
            <Text caption gray>Proses penukaran selama 7 hari kerja</Text>

            <Block marginVertical={20}>
                    <TouchableOpacity
                        style={{ width: '100%', backgroundColor: colors.primary, height: 50, justifyContent: 'center', borderRadius: 8, elevation: 9 }}
                        onPress={() => this.props.navigation.navigate('Login') }
                    >
                        <Text center white bold>Redeem</Text>
                    </TouchableOpacity>
                </Block>

    </Block>

    </Block>

</Block>
:
null
}
       </Block>

</Block>
: activeTab == "Tabungan Bonus" ? 

<Block>

<Block margin={20}>
           <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>Tabungan Bonus</Text>
       </Block>  

       <Block margin={[0, 5]}>
           <Input 
               placeholder="Masukan Jumlah Withdraw"
               inputStyle={{ fontSize: 13 }}
               inputContainerStyle={{ borderWidth: 1, borderRadius: 10, paddingLeft: 10, borderColor: '#ddd', }}
               containerStyle={{ marginVertical: 0 }}
               style={{ marginVertical: 0, paddingVertical: 0 }}
               keyboardType="numeric"
               returnKeyLabel="Proses"
           />
           <Block margin={[0, 15]}>
               <Text gray>Data diri harus lengkap & saldo yang bisa ditransfer ke rekening min Rp. 50.000,-</Text>

               <Block row marginTop={20}>
                <Block marginRight={10} flex={false}>
                    <Button 
                        title="Withdraw"
                        buttonStyle={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
                        titleStyle={{ fontSize: 13, fontFamily: 'Poppins-Regular' }}
                    />
                </Block>
                {/* <Block marginRight={10}>
                   <Button 
                       title="Lengkapi Data"
                       buttonStyle={{ backgroundColor: colors.white, borderColor: colors.primary, borderWidth: 1 }}
                       titleStyle={{ fontSize: 10, fontFamily: 'Poppins-Bold', color: colors.primary }}
                   />
               </Block>
               <Block marginRight={10}>
                   <Button 
                       title="Ubah Rekening"
                       buttonStyle={{ backgroundColor: colors.white, borderColor: colors.primary, borderWidth: 1 }}
                       titleStyle={{ fontSize: 10, fontFamily: 'Poppins-Bold', color: colors.primary }}
                   />
               </Block> */}
               </Block>

           </Block>
       </Block>

       <Block margin={[20, 20]}>
           
<Block white margin={[10, 0]} >
    <Block>
        <Text style={{ fontFamily: 'Poppins-Bold' }}>Riwayat Tabungan Bonus</Text>
    </Block>
</Block>

<Block row style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
    <Block flex={0.5}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>No</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Tgl</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Diterima</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Withdraw</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Saldo</Text>
    </Block>
</Block>

{[1, 2,3 ].map((item, index) => (

    <Block row key={index} style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
        <Block flex={0.5}>
            <Text caption>{item}</Text>
        </Block>
        <Block flex={1}>
            <Text caption>1/12/20</Text>
        </Block>
        <Block flex={1}>
            <Text caption uang value={50000}  />
        </Block>
        <Block flex={1}>
            <Text caption uang value={0}  />
        </Block>
        <Block flex={1}>
            <Text caption uang value={250000}  />
        </Block>
    </Block>

))}
       </Block>

</Block>

:
 activeTab == "Incentive" ? 

<Block>

       <Block margin={20}>
           <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>Laporan Bonus Saya</Text>
       </Block>             
       

       <Block margin={[0, 20, 20, 20]}>
    {/* <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>Network Saya</Text> */}
    <TouchableWithoutFeedback>
        <Block
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10 }}
          row
        >
          <Block middle paddingLeft={5}>
              <Text>Juli 2020</Text>
          </Block>
          <Block middle>
              <Icon name="chevron-down" size={18} type="feather" iconStyle={{ alignSelf: 'flex-end' }} />
          </Block>
        </Block>
    </TouchableWithoutFeedback>
</Block>

<Block margin={[0, 20]} style={{ backgroundColor: '#DFECD0', borderRadius: 5 }} padding={10}>
                <Text caption>Periode : Juli 2020</Text>
</Block>

<Block margin={[10, 20]}>

<Block white row padding={10} style={{ elevation: 5, borderRadius: 5 }} margin={[10, 0]} >
    <Block>
        <Text caption>Total Bonus</Text>
    </Block>
    <Block>
        <Text caption secondary right uang value={67350} />
    </Block>
</Block>

<Block white margin={[10, 0]} >
    <Block>
        <Text style={{ fontFamily: 'Poppins-Bold' }}>Rekomendasi Bonus</Text>
    </Block>
</Block>

<Block row style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
    <Block flex={0.5}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>No</Text>
    </Block>
    <Block flex={2}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Nama Member</Text>
    </Block>
    <Block flex={2}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Jml Bonus</Text>
    </Block>
</Block>

{[1, 2,3 ].map((item, index) => (

    <Block row key={index} style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
        <Block flex={0.5}>
            <Text caption>{item}</Text>
        </Block>
        <Block flex={2}>
            <Text caption>Nama Member</Text>
        </Block>
        <Block flex={2}>
            <Text caption uang value={50000}  />
        </Block>
    </Block>

))}

<Block row style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
<Block flex={0.5}>
        </Block>
        <Block flex={2}>
            <Text right caption style={{ fontFamily: 'Poppins-Bold', paddingRight: 20 }}>Jumlah</Text>
        </Block>
        <Block flex={2}>
            <Text caption uang value={150000} style={{ fontFamily: 'Poppins-Bold' }}/>
        </Block>
    </Block>


    <Block white margin={[15, 0]} style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
            <Block>
                <Text style={{ fontFamily: 'Poppins-Bold' }}>Performance Bonus</Text>
            </Block>
        </Block>
    
<Block marginTop={0} row style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
    <Block flex={0.5}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>No</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Bulan</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Peringkat</Text>
    </Block>
    <Block flex={1}>
        <Text caption style={{ fontFamily: 'Poppins-Bold' }}>Jml Bonus</Text>
    </Block>
</Block>

{[1, 2,3 ].map((item, index) => (

    <Block row key={index} style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
        <Block flex={0.5}>
            <Text caption>{item}</Text>
        </Block>
        <Block flex={1}>
            <Text caption>Juli</Text>
        </Block>
        <Block flex={1}>
            <Text caption>12%</Text>
        </Block>
        <Block flex={1}>
            <Text caption uang value={50000} />
        </Block>
    </Block>

))}

<Block row style={{ borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
<Block flex={0.5}>
        </Block>
        <Block flex={1}>
        </Block>
        <Block flex={1}>
            <Text right caption style={{ fontFamily: 'Poppins-Bold', paddingRight: 20 }}>Jumlah</Text>
        </Block>
        <Block flex={1}>
            <Text caption uang value={150000} style={{ fontFamily: 'Poppins-Bold' }} />
        </Block>
    </Block>

</Block>

</Block>

:

              
             activeTab == "Network" ? 

             <Block>

             <Block row margin={20}>

{ tabsNetwork.map((item, index) => 

<Block key={index}>
    <TouchableOpacity
      style={{ marginRight: 10, backgroundColor: activeTabNet != item.nama ? colors.white : colors.primary, padding: 5, borderRadius: 5, borderWidth: 1, borderColor: activeTabNet == item.nama ? colors.white : colors.primary }}
      onPress={() => this.setState({ activeTabNet: item.nama }) }
    >
          <Text center color={activeTabNet == item.nama ? colors.white : colors.primary} caption>{item.nama}</Text>
    </TouchableOpacity>
</Block>

) }

</Block> 

            

             { activeTabNet == "Network Tree" ?

<Block>

  <Block row center padding={10} style={{ width: '50%', alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: '#ddd' }}>
          <Block flex={false}>
              <Image 
                  source={{ uri: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png' }}
                  style={{ width: 40, height: 40 }}
              />
          </Block>
          <Block flex={false} paddingLeft={10}>
              <Text caption>Hasib Muharam</Text>
              <Text caption >Network & TPV</Text>
          </Block>
  </Block>

  <Block row>
      <Block style={{ borderRightWidth: 2, borderRightColor: '#ddd', height: 30 }}><Text></Text></Block>
      <Block/>
  </Block>

  <Block row style={{ width: '50%', alignSelf: 'center' }}>
      <Block style={{ borderTopWidth: 2, borderTopColor: '#ddd', height: 30, borderRightWidth: 2, borderRightColor: '#ddd', borderLeftWidth: 2, borderLeftColor: '#ddd' }}><Text></Text></Block>
  </Block>

  <Block flex={false}>
  <Swiper
      style={{ height: 80 }}
      showsPagination={false}
      loop={false}
  >
      {[1,2,3].map((item, index) => 

          <Block flex={false} key={index} center row margin={[0, 20]}>
              <Block flex={false} row center padding={10} marginRight={20} style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: '#ddd' }}>
                      <Block flex={false}>
                          <Image 
                              source={{ uri: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png' }}
                              style={{ width: 25, height: 25 }}
                          />
                      </Block>
                      <Block flex={false} flex={false} paddingLeft={10}>
                          <Text caption>User 1</Text>
                          <Text caption >Network & TPV</Text>
                      </Block>
              </Block>

              <Block flex={false} row center padding={10} style={{ alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: '#ddd' }}>
                      <Block flex={false}>
                          <Image 
                              source={{ uri: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png' }}
                              style={{ width: 25, height: 25 }}
                          />
                      </Block>
                      <Block flex={false} paddingLeft={10}>
                          <Text caption>User 2</Text>
                          <Text caption >Network & TPV</Text>
                      </Block>
              </Block>
          
          </Block>

      )}
  </Swiper>
  </Block>

  <Block flex={false} margin={20}>
      <TouchableOpacity>
          <Text right primary style={{ fontFamily: 'Poppins-Bold' }}>Download Detail</Text>
      </TouchableOpacity>
  </Block>

</Block>

:

<Block>

<Block>
<Block margin={[0, 20, 20, 20]}>
    {/* <Text secondary style={{ fontFamily: 'Poppins-Bold' }}>Network Saya</Text> */}
    <TouchableWithoutFeedback>
        <Block
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10 }}
          row
        >
          <Block middle paddingLeft={5}>
              <Text>Juli 2020</Text>
          </Block>
          <Block middle>
              <Icon name="chevron-down" size={18} type="feather" iconStyle={{ alignSelf: 'flex-end' }} />
          </Block>
        </Block>
    </TouchableWithoutFeedback>
</Block>

<Block margin={[0, 20]}>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5 }}>
        <Block>
            <Text gray>Nama</Text>
        </Block>
        <Block>
            <Text right>Nama</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Peringkat</Text>
        </Block>
        <Block>
            <Text right>Director</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Jumlah Rekomendasi</Text>
        </Block>
        <Block>
            <Text right>5 Orang</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Total Network</Text>
        </Block>
        <Block>
            <Text right>15 Orang</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Jumlah Frontline</Text>
        </Block>
        <Block>
            <Text right>3 Orang</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Level Terdalam</Text>
        </Block>
        <Block>
            <Text right>3 Level</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Total Point Value (TPV)</Text>
        </Block>
        <Block>
            <Text right>159.000 TPV</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>Jumlah Kelompok Mandiri (KM)</Text>
        </Block>
        <Block>
            <Text right>99.000 PV</Text>
        </Block>
    </Block>
    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>TPV KM1</Text>
        </Block>
        <Block>
            <Text right>1 KM</Text>
        </Block>
    </Block>

    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>TPV Kelompok Pribadi (KP)</Text>
        </Block>
        <Block>
            <Text right>6.000 PV</Text>
        </Block>
    </Block>

    <Block row style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
        <Block>
            <Text gray>PV Pribadi</Text>
        </Block>
        <Block>
            <Text right>1.000 PV</Text>
        </Block>
    </Block>

</Block>
</Block>

</Block>

}
             </Block>

             : activeTab == "Transaksi" ?

             <Block>
             <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                                    <Block margin={[0, 20, 0, 20]}>
                        {/* <Text secondary h3 bold>{item.nama}</Text> */}
                    </Block>
                <Block marginTop={20} paddingHorizontal={0}>
     
                        {[1, 2, 3, 4, 5, 6, 7, 8 , 9, 10].map((item, index) => (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => this.props.navigation.navigate('StatusPesanan') }
                            >
                                <Block flex={false}
                                >
                                <Block
                                    padding={10}
                                    style={{ backgroundColor: '#ddd' }}
                                row
                                >
                                    <Block>
                                        <Text secondary>Senin, 23 Mar 2020</Text>
                                    </Block>
                                    <Block>
                                        <Text right primary uang value={312000} style={{ fontFamily: 'Poppins-Bold' }} />
                                    </Block>
                                    </Block>

                                    <Block padding={20} row>
                                        <Block>
                                            <Text>MCR27362734723654</Text>
                                            <Text caption gray>Menunggu Pembayaran</Text>
                                        </Block>
                                        <Block>
                                            <Text right uang value={112000} />
                                            <Text right gray>17:24</Text>
                                        </Block>
                                    </Block>

                                </Block>
                            </TouchableWithoutFeedback>
                        ))}
                </Block>
                    </ScrollView>
             </Block>

             : null

             }

      </ScrollView>
      </Block>
    );
  }

}
