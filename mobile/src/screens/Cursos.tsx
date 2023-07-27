import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListService from '../components/ListService';
import ListOportunidades from '../components/ListOportunidades';

type Nav = {
    navigate: (value: string) => void;
}

export default function Cursos(){
    const navigation = useNavigation<Nav>();
    const [oportunidades, setOportunidades] = useState([]);
    const [candidato, setCandidato] = useState<string>('');
      
    const tipo = 1;


    useEffect(() => {
        
        getData();
        
        api({
            method: 'get',    
            url: `oportunidades/${tipo}`,                 
        }).then(function(response) {
            setOportunidades(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso aos cursos! Tente novamente.`);
        })
    
    }, []);

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
        const jsonCont = await AsyncStorage.getItem('auth.conId');
        if (jsonValue != null) { 
            setCandidato(jsonValue)
        }else { 
            alert(`erro no acesso: ${jsonValue}`);
        }       
    };

    return (
        <View className="flex-1 bg-[#16568A]">   
            <View className='flex items-center w-full h-auto justify-center' >
                <Text className=' text-white text-2xl font-bold mt-20'>CURSOS</Text>
            </View>          
            
            <FlatList
                data={oportunidades}
                className=''
                numColumns={1}
                renderItem={({ item }) => <ListOportunidades data={item} />}
                keyExtractor={(item) => item.optId}
            />
        </View>
    )
}