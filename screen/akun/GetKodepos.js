import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, ActivityIndicator } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { apiConfig, apiUrl } from '../../constants/api';

export default class GetKodepos extends React.Component{

    constructor() {
        super();

        this.state = {
            loadingData: true,
            kodeposList: [],
        }

    }

    componentDidMount() {
        this.GetKodepos()               
    }

    GetKodepos(){

        const kecamatan_id = this.props.route.params.kecamatan_id;

        axios.get(`${apiUrl}main/member/get_kodepos?kecamatan_id=${kecamatan_id}`, apiConfig)
        .then(res => {
            const kodeposList = res.data.data;
            this.setState({ kodeposList, loadingData: false });
        })
    }


    render(){

        const { loadingData, kodeposList } = this.state;

        if(loadingData){
            return (
                <Block middle center padding={20}>
                    <ActivityIndicator color={colors.primary} size="large"/>
                </Block>
            )
        }

        if(this.props.params == undefined){
            var kodepos_id = null;
        } else {
            var kodepos_id = this.props.route.params.kodepos_id;
        }

        if(this.props.params == undefined){
            var route = null;
        } else {
            var route = this.props.route.params.route;
        }

        return(
            <ScrollView showsVerticalScrollIndicator={false} flex={1} style={{ backgroundColor: '#f5f5f5' }}>

            {kodeposList.map((item, index) => (

                <TouchableWithoutFeedback
                key={index}
                    onPress={() => this.props.navigation.navigate( route != undefined ? route : 'AlamatForm', { kodepos: item.kd_pos }) }
                >
                    <Block flex={false} row padding={[15]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                    <Block row style={{ backgroundColor: '#fff',  }}>
                        <Block middle flex={4}>
                            <Text caption>{item.kd_pos}</Text>
                        </Block>

                        <Block right flex={1}>
                            {kodepos_id == item.id && <Icon name="check" color="green" iconStyle={{ alignSelf: 'flex-end' }} /> }
                        </Block>

                    </Block>
                    </Block>
                </TouchableWithoutFeedback>

            ))}


            </ScrollView>
        );
    };
}