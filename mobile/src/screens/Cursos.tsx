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
    const [candidato, setCandidato] = useState([]);
      
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
        try {
          const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
          return jsonValue != null ? setCandidato(JSON.parse(jsonValue)) : alert('erro');
        } catch (e) {
          // error reading value
        }
        alert(candidato);
    };

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-2/3'>
                <ImageBackground className='w-full h-full opacity-50'
                    source={require('../../assets/login.png')}  
                />
            </View>    
            <Text>CURSOS</Text>
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