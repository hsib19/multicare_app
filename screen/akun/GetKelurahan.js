import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import axios from "axios";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {  apiUrl, apiConfig } from '../../constants/api';
import { colors } from '../../constants/theme';

export default class GetKelurahan extends React.Component{

    constructor() {
        super();

        this.state = {
            loadingData: true,
            kelurahanList: [],
        }

    }

    componentDidMount() {
        this.GetKelurahan()               
    }

    GetKelurahan(){

        const kecamatan_id = this.props.route.params.kecamatan_id;

        axios.get(`${apiUrl}main/member/get_kelurahan?kecamatan_id=${kecamatan_id}`, apiConfig)
        .then(res => {
            const kelurahanList = res.data.data;
            this.setState({ kelurahanList, loadingData: false });
        })
    }


    render(){

        const { loadingData, kelurahanList } = this.state;

        if(loadingData){
            return (
                <Block middle center padding={20}>
                    <ActivityIndicator color={colors.primary} size="large"/>
                </Block>
            )
        }

        if(this.props.params == undefined){
            var kelurahan_id = null;
        } else {
            var kelurahan_id = this.props.route.params.kelurahan_id;
        }

        if(this.props.params == undefined){
            var route = null;
        } else {
            var route = this.props.route.params.route;
        }

        return(
            <ScrollView showsVerticalScrollIndicator={false} flex={1} style={{ backgroundColor: '#f5f5f5' }}>

            {kelurahanList.map((item, index) => (

                <TouchableWithoutFeedback
                key={index}
                    onPress={() => this.props.navigation.navigate(route != undefined ? route : 'AlamatForm', { kelurahan_id: item.id, nama_kelurahan: item.kelurahan, kodepos : undefined, }) }
                >
                    <Block flex={false} row padding={[15]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Block row style={{ backgroundColor: '#fff',  }}>
                        <Block middle flex={4}>
                            <Text caption>{item.kelurahan}</Text>
                        </Block>

                        <Block right flex={1}>
                            {kelurahan_id == item.id && <Icon name="check" color="green" iconStyle={{ alignSelf: 'flex-end' }} /> }
                        </Block>

                    </Block>
                    </Block>
                </TouchableWithoutFeedback>

            ))}


            </ScrollView>
        );
    };
}