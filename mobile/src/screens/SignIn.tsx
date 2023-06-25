import React, {useState, useEffect, useContext} from 'react'
import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { AuthContext } from '../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn }: any = useContext(AuthContext);

    async function handleSignIn(){
        signIn(email, password)  
    }

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='flex items-center '>
                <Text className='mt-24 text-3xl font-bold text-white'>LOGIN</Text>
                <Text className='mt-2 text-xs text-[#4BB146]'>Acompanhe suas solicitações</Text>
            </View>            
            <View className='mt-20 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe seu email'
                    value={email}
                    onChangeText={setEmail}>
                </TextInput>
            </View>
            <View className='mt-6 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe sua senha' 
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}>
                </TextInput>
            </View>                        
            <TouchableOpacity onPress={handleSignIn} className='flex justify-center items-center mt-10 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text className='font-bold text-white'>ENTRAR</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={handleSignIn} className='flex justify-center items-center mt-6 mr-4 ml-4'>
                <Text className='font-bold text-[#4BB146]'>Esqueceu sua senha?</Text>
            </TouchableOpacity> 
            <View className='flex items-center w-full mt-36 h-2/3'>
                <Image className='w-100 h-100'
                    source={require('../../assets/logo.png')}
                />
            </View>
        </View>
    )
}
