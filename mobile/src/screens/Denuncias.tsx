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
import ListDenuncia from '../components/ListDenuncia';

type Nav = {
    navigate: (value: string) => void;
}

export default function Denuncias(){
    const navigation = useNavigation<Nav>();
    const [denuncias, setDenuncias] = useState([]);
    const [authToken, setAuthToken] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const idCon = 1;

    useEffect(() => {
        setTimeout(() => {
            handleGetToken()
        }, 1000)
         
        api({
            method: 'get',    
            url: `denContato/${idCon}`,
            headers: {
                "x-access-token" : authToken    
            },      
        }).then(function(response) {
            setDenuncias(response.data);
        }).catch(function(error) {  
            handleRefreshToken()                 
        })

    }, [atualiza]);
    
    const handleGetToken = async () => {
        const token = await AsyncStorage.getItem('auth.token');
        setAuthToken(token);
    }

    function handleNewDenuncia(){
        navigation.navigate("NewDenuncia");
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
            alert(`Falha no acesso as denuncias! Tente novamente.`);
            navigation.navigate("SignIn");      
        })
    }

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-1/3'>
                <ImageBackground className='w-full h-full opacity-50'
                    source={require('../../assets/login.png')}  
                />
            </View>    
            <View className='flex absolute w-full items-center justify-center mt-20'>
                <Text className='text-3xl font-bold text-white '>Solicitações</Text>
                <TouchableOpacity onPress={handleNewDenuncia} className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                    <Text className='font-bold text-white'>NOVA DENUNCIA</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={denuncias}
                className=''
                numColumns={1}
                renderItem={({ item }) => <ListDenuncia data={item} />}
                keyExtractor={(item) => item.denId}
            />
        </View>
    )
}