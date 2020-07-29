import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import { Block, Text } from '../../components';
import { Input, Icon, CheckBox, Button } from 'react-native-elements';
import { colors } from '../../constants/theme';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { apiUrl, apiConfig } from '../../constants/api';

export default class AlamatForm extends React.Component{


    constructor() {
        super();

        this.state = {
            loadingData: true,
            alamatList: [],
            loading: false,
            nama: '',
            hp:''
        }

    }

    componentDidMount() {
        this.getAlamat()               
    }

    async getAlamat(){

        const userid = await AsyncStorage.getItem('userid');

        axios.get(apiUrl+`main/member/alamat_list?userid=${userid}`, apiConfig)
        .then(res => {
            const alamatList = res.data.data;
            this.setState({ alamatList, loadingData: false });
        })
    }

    handleHandphone(text){
       if(isNaN(text)){
           var errorHp = 'No Handphone tidak valid';
    } else if(text.length <= 10) {
        var errorHp = 'Minimal 10 Angka';  
    } else {
        var errorHp = '';  
       }

       this.setState({
        hp: text,
        errorHp: errorHp
    })
    }

    async saveAlamat(){

        this.setState({
            loading: true
        })

        const userid = await AsyncStorage.getItem('userid');
        // const { provinsi, kota, kecamatan, kelurahan, kodepos, city_id } = this.props.route.params;

        if(this.props.route.params == undefined){
            var provinsi = null;
        } else {
            var provinsi = this.props.route.params.nama_prov;
        }

        if(this.props.route.params == undefined){
            var kota = null;
        }else {
            var kota = this.props.route.params.nama_kota;
        }

        if(this.props.route.params == undefined){
            var kecamatan = null;
        }else {
            var kecamatan = this.props.route.params.nama_kecamatan;
        }

        if(this.props.route.params == undefined){
            var kelurahan = null;
        }else {
            var kelurahan = this.props.route.params.nama_kelurahan;
        }

        if(this.props.route.params == undefined){
            var kodepos = null;
        }else {
            var kodepos = this.props.route.params.kodepos;
        }

        if(this.props.route.params == undefined){
            var city_id = null;
        }else {
            var city_id = this.props.route.params.city_id;
        }

        // const provinsi = navigation.getParam('nama_prov');
        // const kota = navigation.getParam('nama_kota');
        // const kecamatan = navigation.getParam('nama_kecamatan');
        // const kelurahan = navigation.getParam('nama_kelurahan');
        // const kodepos = navigation.getParam('kodepos');
        // const city_id = navigation.getParam('city_id');

        const { hp, nama, alamat, utamakan } = this.state;

        const dataPost = {
            city_id: city_id,
            userid: userid,
            nama: nama,
            hp: hp,
            alamat: alamat,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            kodepos: kodepos,
            utama: utamakan,
        }

        console.log(dataPost)

        axios.post(apiUrl+'main/member/alamat', dataPost, apiConfig )
        .then(response => {
            this.setState({
                loading: false
            });

            this.props.navigation.goBack();

        })

    }


    render(){

        const { loading, alamatList, errorHp } = this.state;
       
        if(this.props.route.params == undefined){
            var prov_id = null;
        } else {
            var prov_id = this.props.route.params.prov_id;
        }

        if(this.props.route.params == undefined){
            var nama_prov = null;
        }else {
            var nama_prov = this.props.route.params.nama_prov;
        }

        if(this.props.route.params == undefined){
            var nama_kota = null;
        }else {
            var nama_kota = this.props.route.params.nama_kota;
        }

        if(this.props.route.params == undefined){
            var kelurahan = null;
        }else {
            var kota_id = this.props.route.params.kota_id;
        }

        if(this.props.route.params == undefined){
            var kecamatan_id = null;
        }else {
            var kecamatan_id = this.props.route.params.kecamatan_id;
        }

        if(this.props.route.params == undefined){
            var nama_kecamatan = null;
        }else {
            var nama_kecamatan = this.props.route.params.nama_kecamatan;
        }

        if(this.props.route.params == undefined){
            var nama_kelurahan = null;
        }else {
            var nama_kelurahan = this.props.route.params.nama_kelurahan;
        }

        if(this.props.route.params == undefined){
            var kodepos = null;
        }else {
            var kodepos = this.props.route.params.kodepos;
        }

        if(this.props.route.params == undefined){
            var kecamatan_id = null;
        }else {
            var kecamatan_id = this.props.route.params.kecamatan_id;
        }


        // const prov_id = navigation.getParam('prov_id');
        // const nama_prov = navigation.getParam('nama_prov');
        // const nama_kota = navigation.getParam('nama_kota');
        // const kota_id = navigation.getParam('kota_id');
        // const kecamatan_id = navigation.getParam('kecamatan_id');
        // const nama_kecamatan = navigation.getParam('nama_kecamatan');
        // const nama_kelurahan = navigation.getParam('nama_kelurahan');
        // const kodepos = navigation.getParam('kodepos');
        // const kecamatan_id = navigation.getParam('kecamatan_id');

        return(

            <Block>
                <ScrollView style={{ backgroundColor: '#f5f5f5' }}>

<KeyboardAvoidingView behavior="padding" enabled>
    <Block flex={false} padding={[0, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Nama</Text>
        </Block>
        <Block middle center>
            <Input 
                placeholder="Masukan Nama" 
                onChangeText={(text) => this.setState({nama: text})}
                inputStyle={{ fontSize: 12, textAlign: 'right' }}
                value={this.state.nama}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                containerStyle={{ height: 50}}
            />
        </Block>
      </Block>
    </Block>

    <Block flex={false} row padding={[0, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>No. Telepon</Text>
        </Block>
        <Block middle>
            <Input 
                placeholder="Masukan No. Telepon" 
                keyboardType="numeric"
                inputStyle={{ fontSize: 12, textAlign: 'right' }}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                onChangeText={(text) => this.handleHandphone(text) }
                errorMessage={errorHp}
                errorStyle={{ textAlign: 'right' }}
                containerStyle={{ height: 50}}
            />
        </Block>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Provinsi</Text>
        </Block>
        <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('GetProvinsi') }
        >
            {nama_prov != undefined ?
                <Text caption gray right>{nama_prov}</Text>
            :
            <Block row right>
                <Text caption gray right>Pilih Provinsi </Text>
                <Icon name="right" size={16} color={colors.gray} type="antdesign" />
            </Block>
            }
        </TouchableWithoutFeedback>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Kabupaten/Kota</Text>
        </Block>
        <TouchableWithoutFeedback
            onPress={() => nama_prov == null ? ToastAndroid.show('Pilih Provinsi dulu!', ToastAndroid.SHORT) : this.props.navigation.navigate('GetKota', { prov_id: prov_id }) }
        >
            {nama_kota != undefined ?
                <Text caption gray right>{nama_kota}</Text>
            :
            <Block row right>
                <Text caption gray right>Pilih Kabupaten/Kota </Text>
                <Icon name="right" size={16} color={colors.gray} type="antdesign" />
            </Block>
            }
        </TouchableWithoutFeedback>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Kecamatan</Text>
        </Block>
        <TouchableWithoutFeedback
            onPress={() => nama_kota == null ? ToastAndroid.show('Pilih Kota dulu!', ToastAndroid.SHORT) : this.props.navigation.navigate('GetKecamatan', { kota_id: kota_id }) }
        >

            {nama_kecamatan != undefined ?
                <Text caption gray right>{nama_kecamatan}</Text>
            :
            <Block row right>
                <Text caption gray right>Pilih Kecamatan </Text>
                <Icon name="right" size={16} color={colors.gray} type="antdesign" />
            </Block>
            }

        </TouchableWithoutFeedback>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Kelurahan</Text>
        </Block>
        <TouchableWithoutFeedback
            onPress={() => nama_kecamatan == null ? ToastAndroid.show('Pilih Kecamatan dulu!', ToastAndroid.SHORT) : this.props.navigation.navigate('GetKelurahan', { kecamatan_id: kecamatan_id }) }
        >

            {nama_kelurahan != undefined ?
                <Text caption gray right>{nama_kelurahan}</Text>
            :
            <Block row right>
                <Text caption gray right>Pilih Kelurahan </Text>
                <Icon name="right" size={16} color={colors.gray} type="antdesign" />
            </Block>
            }

        </TouchableWithoutFeedback>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Kodepos</Text>
        </Block>
        <TouchableWithoutFeedback
            onPress={() => nama_kelurahan == null ? ToastAndroid.show('Pilih kelurahan dulu!', ToastAndroid.SHORT) : this.props.navigation.navigate('GetKodepos', { kecamatan_id: kecamatan_id }) }
        >
            
            {kodepos != undefined ?
                <Text caption gray right>{kodepos}</Text>
            :
            <Block row right>
                <Text caption gray right>Kodepos </Text>
                <Icon name="right" size={16} color={colors.gray} type="antdesign" />
            </Block>
            }
        </TouchableWithoutFeedback>
      </Block>
    </Block>

    <Block flex={false} row padding={[15, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Alamat Lengkap</Text>
            <TextInput
                placeholder="Alamat Lengkap"
                style={{ fontSize: 12 }}
                multiline={true}
                onChangeText={(alamat) => this.setState({alamat})}
                value={this.state.alamat}
            />
        </Block>
      </Block>
    </Block>

    
    <Block flex={false} row margin={[10, 0]} padding={[0, 10]} style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Block row style={{ backgroundColor: '#fff',  }}>
        <Block middle>
            <Text caption>Jadikan Alamat Utama</Text>
        </Block>
        <CheckBox
        center
        onPress={() => this.setState({ utamakan : !this.state.utamakan }) }
        checked={this.state.utamakan}
        checkedColor={colors.primary}
        />
      </Block>
    </Block>


</KeyboardAvoidingView>
   
</ScrollView>

<ScrollView style={{ padding: 5 }}>
{/* <Block flex={false} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: '#fff', padding: 10 }}> */}
        <Button 
            onPress={() => this.saveAlamat() }
            loading={loading}
            disabled={ kodepos == undefined || nama_kecamatan == undefined || nama_kelurahan == undefined || nama_kota == undefined || nama_prov == undefined || this.state.nama.length == 0 || this.state.hp.length <= 8 || errorHp != "" || loading == true ? true : false }
            title="Simpan"
            buttonStyle={{ backgroundColor: colors.primary, borderRadius: 5, width: '90%', alignSelf: 'center', paddingVertical: 10 }}
            titleStyle={{ fontSize: 13, fontFamily: 'Poppins-Bold' }}
        />
    {/* </Block> */}
</ScrollView>

            </Block>
        );
    };
}