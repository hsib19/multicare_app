import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { apiUrl, apiConfig } from '../../constants/api';

export default class GetKecamatan extends React.Component{

    constructor() {
        super();

        this.state = {
            loadingData: true,
            kecamatanList: [],
        }

    }

    componentDidMount() {
        this.Getkecamatan()               
    }

    Getkecamatan(){

        const kota_id = this.props.route.params.kota_id;

        axios.get(`${apiUrl}main/member/get_kecamatan?kabkot_id=${kota_id}`, apiConfig)
        .then(res => {
            const kecamatanList = res.data.data;
            this.setState({ kecamatanList, loadingData: false });
        })
    }


    render(){

        const { loadingData, kecamatanList } = this.state;

        if(loadingData){
            return (
                <Block middle center padding={20}>
                    <ActivityIndicator color={colors.primary} size="large"/>
                </Block>
            )
        }

        if(this.props.params == undefined){
            var kecamatan_id = null;
        } else {
            var kecamatan_id = this.props.route.params.kecamatan_id;
        }

        if(this.props.params == undefined){
            var route = null;
        } else {
            var route = this.props.route.params.route;
        }

        return(
            <ScrollView showsVerticalScrollIndicator={false} flex={1} style={{ backgroundColor: '#f5f5f5' }}>

            {kecamatanList.map((item, index) => (

                <TouchableWithoutFeedback
                key={index}
                onPress={() => this.props.navigation.navigate(route != undefined ? route : 'AlamatForm', {
                         kecamatan_id: item.id, 
                         nama_kecamatan: item.kecamatan,
                         nama_kelurahan : undefined,
                         kodepos : undefined,

                          }) }
                >
                    <Block flex={false} row padding={[15]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Block row style={{ backgroundColor: '#fff',  }}>
                        <Block middle flex={4}>
                            <Text caption>{item.kecamatan}</Text>
                        </Block>

                        <Block right flex={1}>
                            {kecamatan_id == item.id && <Icon name="check" color="green" iconStyle={{ alignSelf: 'flex-end' }} /> }
                        </Block>

                    </Block>
                    </Block>
                </TouchableWithoutFeedback>

            ))}


            </ScrollView>
        );
    };
}