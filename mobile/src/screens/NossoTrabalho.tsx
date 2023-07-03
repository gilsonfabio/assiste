import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, TextInput, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListSolicitacao from '../components/ListSolicitacao';
import ListText from '../components/ListText';

type Nav = {
    navigate: (value: string) => void;
}

export default function NossoTrabalho(){
    const navigation = useNavigation<Nav>();
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [authToken, setAuthToken] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const [candidato, setCandidato] = useState([]);
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            handleGetToken()
        }, 2000)
        
        alert(`candidato: ${candidato}`)

        api({
            method: 'get',    
            url: `searchCandidato/${candidato}`            
        }).then(function(response) {
            setCandidatos(response.data);
        }).catch(function(error) {  
            alert(`erro de acesso ${candidato}`)               
        })

    }, []);
    
    const handleGetToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
            if (jsonValue != null) { 
                setCandidato(JSON.parse(jsonValue))
                
            }else { alert('erro');
            }
        } catch (e) {
          // error reading value
        }
    }

    function handleNewSolicitacao(){
        navigation.navigate("NewSolicitacao");
    }

    async function handleRefreshToken(){
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
            alert(`Falha no acesso as solicitações! Tente novamente.`);
            navigation.navigate("SignIn");      
        })
    }

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-1/3'>
                <ImageBackground className='w-full h-full opacity-50'
                    source={require('../../assets/services.png')}  
                />
            </View>    
            <View className='flex absolute w-full items-center justify-center mt-20'>
                <Text className='text-3xl font-bold text-white '>Solicitações</Text>
                <TouchableOpacity onPress={() => {}} className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                    <Text className='font-bold text-white'>NOSSO TRABALHO</Text>
                </TouchableOpacity>
            </View>
            <View className=''>
            <FlatList
                data={candidatos}
                className=''
                numColumns={1}
                renderItem={({ item }) => <ListText data={item} />}
                keyExtractor={(item) => item.canId}
            />
            </View>
        </View>
    )
}