import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListSolicitacao from '../components/ListSolicitacao';

type Nav = {
    navigate: (value: string) => void;
}

export default function Solicitacoes(){
    const navigation = useNavigation<Nav>();
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [authToken, setAuthToken] = useState('');
    const [authRefreshToken, setAuthRefreshToken] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const [idCon, setIdCon] = useState('');
    const [candidato, setCandidato] = useState('');

    useEffect(() => {
        handleGetToken()
        
    }, []);

    useEffect(() => {
        
        //console.log('Id do Contato:',idCon);

        if (idCon !== '' ) {
            api({
                method: 'get',    
                url: `solContato/${idCon}`,
                headers: {
                    "x-access-token" : authToken    
                },      
            }).then(function(response) {
                setSolicitacoes(response.data);
            }).catch(function(error) {  
                handleRefreshToken()                 
            })
        }

    }, [idCon]);
 
    const handleGetToken = async () => {
        const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
        const jsonCont = await AsyncStorage.getItem('auth.conId');
        const token = await AsyncStorage.getItem('auth.token');
        const refreshtoken = await AsyncStorage.getItem('auth.refreshToken');
        if (jsonValue != null) { 
            setCandidato(jsonValue)
            setIdCon(jsonCont) 
            setAuthToken(token)
            setAuthRefreshToken(refreshtoken);
        }else { 
            alert(`erro no acesso: ${jsonValue}`);
        }       
    };

    function handleNewSolicitacao(){
        navigation.navigate("NewSolicitacao");
    }

    function handleGoService(){
        navigation.navigate("Servicos");
    }

    async function handleRefreshToken(){
        /*
        const refreshToken = await AsyncStorage.getItem('auth.refreshToken');
        const idCon = await AsyncStorage.getItem('auth.conId');
        await api({
            method: 'post',    
            url: `refreshToken`,
            data: {
                idCon,                            
            },
            headers: {
                "x-access-token" : refreshToken    
            },      
        }).then(function(response) {
            AsyncStorage.clear()
            AsyncStorage.setItem('auth.token', response.data.token)
            AsyncStorage.setItem('auth.refreshToken', response.data.refreshToken)
            AsyncStorage.setItem('auth.conNomCompleto', response.data.user.conNomCompleto)
            AsyncStorage.setItem('auth.conEmail', response.data.user.conEmail)
            const jsonConId = JSON.stringify(response.data.user.conId)
            AsyncStorage.setItem('auth.conId', jsonConId)
            const jsonCanId = JSON.stringify(response.data.user.conCandidato)
            AsyncStorage.setItem('auth.conCandidato', jsonCanId)
            setAtualiza(atualiza + 1 )
        }).catch(function(error) {
        */

            alert(`Falha no acesso as solicitações! Tente novamente.${idCon}`);
            navigation.navigate("SignIn");

        //})
    }

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-1/3'>
                <ImageBackground className='w-full h-full opacity-50'
                    source={require('../../assets/services.png')}  
                />
            </View>   
            <View className='flex justify-between absolute w-full'>
                <Image className='ml-2 mt-8 w-20 h-10 '
                    source={require('../../assets/logo.png')}  
                /> 
                <View className='flex absolute w-full items-center justify-center mt-8'>
                    <View className='flex flex-row justify-between w-full mr-4'>
                        <Text className='ml-32 text-2xl font-bold text-white '>Solicitações</Text>
                        <TouchableOpacity onPress={handleGoService}>
                            <AntDesign name="leftcircleo" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleNewSolicitacao} className='flex justify-center items-center mt-10 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                        <Text className='font-bold text-white'>NOVA SOLICITAÇÃO</Text>
                    </TouchableOpacity>
                </View>
            </View> 
            <View className='flex flex-col items-center' >   
                <FlatList
                    data={solicitacoes}
                    className=''
                    numColumns={1}
                    renderItem={({ item }) => <ListSolicitacao data={item} />}
                    keyExtractor={(item) => item.solId}
                />
            </View>    
        </View>
    )
}