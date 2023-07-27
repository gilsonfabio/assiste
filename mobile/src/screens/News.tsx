import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListDenuncia from '../components/ListDenuncia';
import ListNews from '../components/ListNews';
  
type NewsProps = {
    newId: number;
    newDescricao: string;
    newData: string;
    newAutor: string;
    newLink: string;
}

type Nav = {
    navigate: (value: string) => void;
}

export default function Denuncias(){
    const navigation = useNavigation<Nav>();
    const [news, setNews] = useState<Array<NewsProps>>([]);
    const [authToken, setAuthToken] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    const idCon = 1;

    useEffect(() => {
        
        api({
            method: 'get',    
            url: `news`,            
        }).then(function(response) {
            setNews(response.data);
        }).catch(function(error) {  
            alert('erro')                 
        })

    }, []);
    
       
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
                        <Text className='ml-32 text-2xl font-bold text-white '>Notícias</Text>
                        <TouchableOpacity onPress={handleGoService}>
                            <AntDesign name="leftcircleo" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View> 
            <FlatList
                data={news}
                className='ml-3'
                numColumns={1}
                renderItem={({ item }) => <ListNews data={item} />}
                keyExtractor={(item) => item.newId.toString()}
            />
        </View>
    )
}
