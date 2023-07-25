import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, TextInput, Image, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import LisSolHist from '../components/LisSolHist';

type Nav = {
    navigate: (
      value: string,
      solId?: any
    ) => void;
}

type paramsProps = {
    solId: number;
}

export default function HisSolicitacao(){
    const route = useRoute();
    const navigation = useNavigation<Nav>();
    const [historicos, setHistoricos] = useState([]);
    const [authToken, setAuthToken] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const { solId } = route.params as paramsProps; 
    
    useEffect(() => {

        console.log(`Id da Solicitação:${solId}`);

        api({
            method: 'get',    
            url: `solHistorico/${solId}`,
            headers: {
                "x-access-token" : authToken    
            },      
        }).then(function(response) {
            setHistoricos(response.data);
        }).catch(function(error) {  
            //handleRefreshToken()                 
        })

    }, []);
    
    const handleGetToken = async () => {
        const token = await AsyncStorage.getItem('auth.token');
        setAuthToken(token);
    }

    function handleNewDenuncia(){
        //navigation.navigate("NewDenuncia");
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
            alert(`Falha no acesso as solicitações novamente.`);
            //navigation.navigate("SignIn");      
        })
    }

    function handleGoService(){
        navigation.navigate("Solicitacoes");
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
                        <Text className='ml-32 text-xl font-bold text-white '>Acompanhamento</Text>
                        <TouchableOpacity onPress={handleGoService}>
                            <AntDesign name="leftcircleo" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View> 
            <FlatList
                data={historicos}
                className=''
                numColumns={1}
                renderItem={({ item }) => <LisSolHist data={item} />}
                keyExtractor={(item) => item.hsoId}
            />
        </View>
    )
}
