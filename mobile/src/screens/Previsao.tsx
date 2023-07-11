import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, Image, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListService from '../components/ListService';

type Nav = {
    navigate: (value: string) => void;
}

export default function Previsao(){
    const navigation = useNavigation<Nav>();
    const [services, setServices] = useState([]);
    const [candidato, setCandidato] = useState([]);
    const [contato, setContato] = useState([]);
    const [dados, setDados] = useState([]);
    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const route = useRoute();
    const {city, lat, lon} = route.params as any;

    useEffect(() => {
        
        api({
            method: 'get',    
            url: `https://api.meteum.ai/v1/forecast?lat=${lat}lon=${lon}`,
            headers: {
                "X-Meteum-API-Key" : '3d63f76e-4acb-4683-b0d2-a8f54de6ba16'
            },      
          }).then(function(resp) {
                setDados(resp.data.geo_object.locality.name);
              //setDados(resp.data);
             
          }).catch(function(error) {  
            alert(`Falha no acesso a Previsão do Tempo! Tente novamente.`);              
          })  
        
    }, []);

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
