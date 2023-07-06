import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, Image, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListService from '../components/ListService';

type Nav = {
    navigate: (value: string) => void;
}

export default function Servicos(){
    const navigation = useNavigation<Nav>();
    const [services, setServices] = useState([]);
    const [candidato, setCandidato] = useState([]);
    const [contato, setContato] = useState([]);
    const [dados, setDados] = useState([]);
      
    useEffect(() => {
        
        getData();
        
        api({
            method: 'get',    
            url: `services`,                 
        }).then(function(response) {
            setServices(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso dos serviços! Tente novamente.`);
        })

        api({
            method: 'get',    
            url: `candidato`,                 
        }).then(function(resp) {
            setDados(resp.data)
        }).catch(function(error) {
            alert(`Falha no acesso do candidato! Tente novamente.`);
        })
    
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
            const jsonCont = await AsyncStorage.getItem('auth.conId');
            if (jsonValue != null) { 
                setCandidato(JSON.parse(jsonValue))
                setContato(JSON.parse(jsonCont)) 
            }else { alert('erro');
            }
        } catch (e) {
          // error reading value
        }
        
    };

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-2/3'>
                <ImageBackground className='w-full h-full opacity-90'
                    source={require('../../assets/services.png')}  
                />
                <Image className='absolute ml-2 mt-12 w-24 h-12 '
                    source={require('../../assets/logo.png')}  
                />
                {dados.map((row, idx) => (
                    <View key={idx} className='flex items-center justify-end absolute w-full h-full'>
                        <Text className='mb-8 ml-5 text-3xl text-white font-bold'>{row.canFrase}</Text>
                    </View>    
                ))}
            </View>               
            <FlatList
                data={services}
                className=''
                numColumns={3}
                renderItem={({ item }) => <ListService data={item} />}
                keyExtractor={(item) => item.srvId}
            />
        </View>
    )
}