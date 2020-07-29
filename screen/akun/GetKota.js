import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { apiUrl, apiConfig } from '../../constants/api';

export default class GetKota extends React.Component{

    static navigationOptions = {
        title: 'Pilih kota'
    }

    constructor() {
        super();

        this.state = {
            loadingData: true,
            kotaList: [],
        }

    }

    componentDidMount() {
        this.GetKota()               
    }

    GetKota(){

        // const prov_id = this.props.navigation.getParam('prov_id', 20);
        const prov_id = this.props.route.params.prov_id;

        axios.get(`${apiUrl}main/member/get_kota?provinsi_id=${prov_id}`, apiConfig)
        .then(res => {
            const kotaList = res.data.data;
            this.setState({ kotaList, loadingData: false });
        })
    }


    render(){

        const { loadingData, kotaList } = this.state;

        if(loadingData){
            return (
                <Block middle center padding={20}>
                    <ActivityIndicator color={colors.primary} size="large"/>
                </Block>
            )
        }
        
        if(this.props.route.params == undefined){
            var kota_id = null;
        } else {
            var kota_id = this.props.route.params.kota_id;
        }

        if(this.props.route.params == undefined){
            var route = null;
        } else {
            var route = this.props.route.params.route;
        }

        return(
            <ScrollView showsVerticalScrollIndicator={false} flex={1} style={{ backgroundColor: '#f5f5f5' }}>

            {kotaList.map((item, index) => (

                <TouchableWithoutFeedback
                key={index}
                    // onPress={() => this.props.navigation.navigate(route != undefined ? route : 'AlamatBaru', { 
                    onPress={() => this.props.navigation.navigate(route != undefined && route == 'Seller' ? 'RegisterSeller' : route == 'Seller'? route : 'AlamatForm', { 
                        kota_id: item.id, 
                        nama_kota: item.kabupaten_kota ,
                        city_id: item.city_id,
                        kecamatan_id : undefined,
                        nama_kecamatan : undefined,
                        nama_kelurahan : undefined,
                        kodepos : undefined,
                        }) }
                >
                    <Block flex={false} row padding={[15]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Block row style={{ backgroundColor: '#fff',  }}>
                        <Block middle flex={4}>
                            <Text caption>{item.kabupaten_kota}</Text>
                        </Block>

                        <Block right flex={1}>
                            {kota_id == item.id && <Icon name="check" color="green" iconStyle={{ alignSelf: 'flex-end' }} /> }
                        </Block>

                    </Block>
                    </Block>
                </TouchableWithoutFeedback>

            ))}


            </ScrollView>
        );
    };
}