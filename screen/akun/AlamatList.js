import React from 'react';
import { View, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Block, Text } from '../../components';
import { Image, Icon } from 'react-native-elements';
import { colors } from '../../constants/theme';
import { TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { apiUrl, apiConfig } from '../../constants/api';
import { Placeholder, PlaceholderMedia, Shine, PlaceholderLine } from 'rn-placeholder';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const { width } = Dimensions.get('screen');

class AlamatList extends React.Component {
  constructor(){
    super();

    this.state = {
      loading: true,
      listAlamat: [],
    }

  }

  componentDidMount(){

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getAlamat();
    });

    this.headerConfig();
    this.getAlamat();
  }

  headerConfig(){
    this.props.navigation.setOptions({
      headerRight: () => ( <TouchableOpacity onPress={() => this.props.navigation.navigate('AlamatForm') } >
        <Block middle center paddingRight={15} row><Icon name="plus" type="antdesign" color={colors.primary} /></Block>
      </TouchableOpacity> )
    })
  }

  async getAlamat() {

    const userid = await AsyncStorage.getItem('userid');

    axios
      .get(apiUrl+'main/member/alamat?userid='+userid, apiConfig)
      .then((response) => {
        const res = response.data;

        this.setState({
          loading: false,
          listAlamat: res.data
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
        <Block key={i} margin={[0, 20]} style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 20, marginBottom: 20 }}>
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

    const { listAlamat, loading } = this.state;

    const chose = null;

    return(
             <ScrollView
                style={{ backgroundColor: '#fff' }}
             >
             { loading ?
                <Block>
                    {this.loadingContent(6)}
                </Block>
             :

             listAlamat.length == 0 ?

             <Block middle center paddingTop={20}>
                 <Text>Alamat belum dibuat</Text>
             </Block>

             :
                <Block margin={20}>
                    {listAlamat.map((item, index) => 
                        <Block key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 }}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.props.setAlamat(item)
                                this.props.navigation.goBack()
                              } }
                            >
                                <Block middle>
                                    <Text style={{ fontFamily: 'Poppins-Bold' }}>{item.nama_lengkap}</Text>
                                    <Text caption>{item.alamat}</Text>
                                </Block>
                                {chose != 1 &&
                                <Block row>
                                    <Block flex={3}>
                                        <TouchableOpacity>
                                            <Text caption primary right>Edit</Text>
                                        </TouchableOpacity>
                                    </Block>
                                    <Block flex={1}>
                                        <TouchableOpacity>
                                            <Text caption primary right>Hapus</Text>
                                        </TouchableOpacity>
                                    </Block>
                                </Block>
                                }
                            </TouchableWithoutFeedback>
                        </Block>
                    )}
                </Block>
             }
             </ScrollView>

    )
  }

}

const mapDispatchToProps = (dispatch) => {
return {
    setAlamat: (data) => dispatch(
      {
        type: 'SET_ALAMAT',
        payload: data
      }
    ),
}
}


export default connect(null, mapDispatchToProps)(AlamatList);