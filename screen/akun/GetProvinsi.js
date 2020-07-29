import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { apiUrl, apiConfig } from '../../constants/api';

export default class GetProvinsi extends React.Component{

    static navigationOptions = {
        title: 'Pilih Provinsi'
    }

    constructor() {
        super();

        this.state = {
            loadingData: true,
            provinsiList: [],
        }

    }

    componentDidMount() {
        this.getProvinsi()               
    }

    getProvinsi(){

        axios.get(`${apiUrl}main/member/get_provinsi`, apiConfig)
        .then(res => {
            const provinsiList = res.data.data;
            this.setState({ provinsiList, loadingData: false });
        })
    }


    render(){

        const { loadingData, provinsiList } = this.state;
        // const prov_id = this.props.route.params.getParam('prov_id');
        // const route = this.props.route.params.getParam('route');

        // const { prov_id, route } = this.props.route.params;

        if(loadingData){
            return (
                <Block middle center padding={20}>
                    <ActivityIndicator color={colors.primary} size="large"/>
                </Block>
            )
        }

        if(this.props.route.params == undefined){
            var prov_id = null;
        } else {
            var prov_id = this.props.route.params.prov_id;
        }

        if(this.props.route.params == undefined){
            var route = null;
        } else {
            var route = this.props.route.params.route;
        }

        return(
            <ScrollView flex={1} style={{ backgroundColor: '#f5f5f5' }}>

            {provinsiList.map((item, index) => (

                <TouchableWithoutFeedback
                key={index}
                    onPress={() => this.props.navigation.navigate(route != undefined && route == 'Seller' ? 'RegisterSeller' : route == 'Seller'? route : 'AlamatForm', { 
                        prov_id: item.id, 
                        nama_prov: item.provinsi,
                        nama_kota : undefined,
                        kota_id : undefined,
                        kecamatan_id : undefined,
                        nama_kecamatan : undefined,
                        nama_kelurahan : undefined,
                        kodepos : undefined,
                        }) }
                >
                    <Block flex={false} row padding={[15]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Block row style={{ backgroundColor: '#fff',  }}>
                        <Block middle flex={4}>
                            <Text caption>{item.provinsi}</Text>
                        </Block>

                        <Block right flex={1}>
                            {prov_id == item.id && <Icon name="check" color="green" iconStyle={{ alignSelf: 'flex-end' }} /> }
                        </Block>

                    </Block>
                    </Block>
                </TouchableWithoutFeedback>

            ))}


            </ScrollView>
        );
    };
}