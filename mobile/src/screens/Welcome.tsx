import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, ImageBackground, Image, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


import api from '../Services/api';
import { AuthContext } from '../contexts/auth';

type Nav = {
    navigate: (value: string) => void;
}

export default function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn }: any = useContext(AuthContext);
    const [news, setNews] = useState([]);

    const navigation = useNavigation<Nav>();
    
    const width = Dimensions.get('window').width;

    async function handleSignIn(){
        signIn(email, password)
  
    }  
    
    useEffect(() => {
        
        api.get(`news`).then(response => { 
            setNews(response.data);
        })
    
    }, []);
    
    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-2/3'>
                <ImageBackground className='w-full h-full opacity-80'
                    source={require('../../assets/welcome.png')}  
                />
                <Image className='absolute ml-2 mt-12 w-24 h-12 '
                    source={require('../../assets/logo.png')}  
                />
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className='flex justify-center items-center absolute ml-80 mt-12 w-14 h-14 bg-[#16568A] rounded-full'>
                    <Feather name="user-plus" size={26} color="black" />
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}className='flex justify-center items-center absolute ml-80 mt-28 w-14 h-14 bg-yellow-400 rounded-full'>
                    <Feather name="plus-circle" size={26} color="black" />
                </TouchableOpacity>                 
                <View className='absolute ml-1 mt-60 flex justify-center items-center w-96 h-64 bg-white rounded-xl opacity-50'>
                    <Carousel
                        loop
                        width={width}
                        height={width / 2}
                        autoPlay={true}
                        data={news}
                        scrollAnimationDuration={1000}
                        renderItem={({ index }) => (
                        <View className='w-full h-full flex items-center justify-center'>
                            <Text className='text-4xl font-bold text-black'>
                                {index}
                            </Text>
                        </View>
                        )}
                    />
                </View>              
            </View> 
            <View className='flex items-center '>
                <Text className='mt-2 text-lg font-bold text-white'>CADASTRE-SE</Text>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput className='flex justify-center w-80 items-center text-black ' placeholder='Informe seu email'></TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput className='flex justify-center w-80 items-center text-black ' placeholder='Informe sua senha'></TextInput>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('NewUser')} className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text className='font-bold text-white'>CADASTRE-SE</Text>
            </TouchableOpacity> 
        </View>
        //navigation.navigate("Produtos")
    )
}



