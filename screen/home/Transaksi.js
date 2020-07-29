import React from 'react';
import { Block, Text } from '../../components';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
export default class Transaksi extends React.Component {
    constructor(){
        super();
        
        this.state = {

        }
    }

    render(){
        return(
            <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                                    <Block margin={[20, 20, 0, 20]}>
                        <Text secondary h3 bold>{'item.nama'}</Text>
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
        )
    }

}