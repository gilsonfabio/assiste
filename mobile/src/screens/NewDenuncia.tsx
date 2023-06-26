import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, Switch, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import SelectSubTipo from '../components/SelectSubTipo';
import SelectTipDenuncia from '../components/SelectTipDenuncia';

type Nav = {
    navigate: (value: string) => void;
}

type tiposProps = {
    tdeId: number;
    tdeDescricao: string;
}

type subtiposProps = {
    stdId: number;
    stdDescricao: string;
}

export default function NewDenuncia(){
    const [tipo, setTipo] = useState('');
    const [subtipo, setSubTipo] = useState('');
    const [texto, setTexto] = useState('');
    const [nome, setNome] = useState('');
    const [fone, setFone] = useState('');    
    
    const [tipos, setTipos] = useState<Array<tiposProps>>([]);
    const [subtipos, setSubTipos] = useState<Array<subtiposProps>>([]);
    
    const idServ = 2;
    const idCon = 1;
    const idCan = 1;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation<Nav>();

    const width = Dimensions.get('window').width;

    async function handleCadastra(){              
        try {
            api.post('newDenuncia', {
                denTipo: tipo, 
                denSubId: subtipo, 
                denDescricao: texto, 
                denCandidato: idCan, 
                denNome: nome, 
                denConId: idCon, 
                denFonContato: fone,
            }).then(() => {
                alert('Denuncia cadastrada com sucesso!')
            }).catch(() => {
                alert('Erro no cadastro!');
            })  
            navigation.navigate('Servicos');
        }catch (err) {
            alert('Falha no Cadastro de Denuncia!');
        }  
    }

    useEffect(() => {
        
        api({
            method: 'get',    
            url: `tipdenuncias`,                 
        }).then(function(response) {
            setTipos(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso dos Tipos de Denuncias! Tente novamente.`);
        })

        api({
            method: 'get',    
            url: `subTipDenuncias`,                 
        }).then(function(response) {
            setSubTipos(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso dos SubTipos de Denuncias! Tente novamente.`);
        })
    
    }, []);
    
    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='flex items-center mt-10'>
                <Text className='mt-2 text-lg font-bold text-white'>CADASTRE SUA DENUNCIA</Text>
            </View>
            <Text className='text-white text-[10px] ml-4 mt-3 '>Tipo de Denuncia:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <SelectTipDenuncia options={tipos} setTipo={setTipo} texto={'Selecione a opção'}  /> 
            </View> 
            <Text className='text-white text-[10px] ml-4 mt-3 '>SubTipo Denuncia:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <SelectSubTipo options={subtipos} setSubTipo={setSubTipo} texto={'Selecione SubTipo de Denuncia'}  /> 
            </View>      
            <Text className='text-white text-[10px] ml-4 mt-3 '>Descrição Denuncia:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='w-80 text-black'                     
                    placeholder='Informe sua Denuncia'
                    editable
                    multiline
                    numberOfLines={8}
                    maxLength={300} 
                    value={texto}
                    onChangeText={setTexto}>
                </TextInput>
            </View> 
            <Text className='text-white text-[10px] ml-4 mt-3 '>Nome:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='w-80 text-black'                     
                    placeholder='Informe seu nome'
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={50} 
                    value={nome}
                    onChangeText={setNome}>
                </TextInput>
            </View> 
            <Text className='text-white text-[10px] ml-4 mt-3 '>Telefone:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='w-80 text-black'                     
                    placeholder='Informe seu telefone'
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={50} 
                    value={fone}
                    onChangeText={setFone}>
                </TextInput>
            </View>            
            <TouchableOpacity className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text onPress={handleCadastra} className='font-bold text-white'>ENVIAR DENUNCIA</Text>
            </TouchableOpacity> 
        </View>
    )
}