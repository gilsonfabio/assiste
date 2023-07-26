import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, Image, ImageBackground, View, Text, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
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
    const [candidato, setCandidato] = useState<string>('');
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() => {
        handleGetToken()
    }, []);

    useEffect(() => {
        if (atualiza > 0) {
            if (candidato != null) {
                console.log('Key:', candidato)
                api({
                    method: 'get',    
                    url: `searchCandidato/${candidato}`,                 
                }).then(function(resp) {
                    setCandidatos(resp.data)
                }).catch(function(error) {
                    alert(`Falha no acesso do candidato! Tente novamente.`);
                })
            }       
        }    
    }, [atualiza]);
    
    const handleGetToken = async () => {
        const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
        if (jsonValue != null) { 
            setCandidato(jsonValue)
        }else { 
            alert('erro');
        }
        setAtualiza(atualiza + 1);       
    };
    
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

    function handleGoService(){
        navigation.navigate("Servicos");
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
                        <Text className='ml-32 text-2xl font-bold text-white '>Agenda</Text>
                        <TouchableOpacity onPress={handleGoService}>
                            <AntDesign name="leftcircleo" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View> 
            <View className='flex flex-col items-center' >  
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