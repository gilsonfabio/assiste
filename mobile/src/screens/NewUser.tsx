import React, {useState, useEffect, useContext, useRef} from 'react'
import {Dimensions, Image, Switch, View, Text, TextInput, TouchableOpacity, Platform} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';

type Nav = {
    navigate: (value: string) => void;
}

type token = {
    type: string;
    data: string;
}

export default function NewUser(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [celular, setCelular] = useState('');
    const [autContato, setAutContato] = useState('');
    const { signIn }: any = useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [candidato, setCandidato] = useState([]);
    const [keyCan, setKeyCan] = useState('');

    const [tokenPush, setTokenPush] = useState();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation<Nav>();

    const width = Dimensions.get('window').width;

    useEffect(() => {
        
        let candidato = 1;
        api({
            method: 'get',    
            url: `accessCandidato/${candidato}`,                 
        }).then(function(response) {
            setCandidato(response.data)
            setKeyCan(response.data[0].canKey)
        }).catch(function(error) {
            alert(`Falha no acesso ao candidato! Tente mais tarde.`);
        })

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    
    async function registerForPushNotificationsAsync() {
        let token: any;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            }))
            console.log(token);
            setTokenPush(token.data);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
        }
        return token;
    }

    async function handleCadastra(){              
        try {
            api.post('ctoMobile', {
                candidato: keyCan,
                email, 
                nome,
                celular, 
                password,
                pushToken: tokenPush,
            }).then(function (response) {
                if(response.status == 200) {
                    alert('Email já cadastrado para outro contato! Favor verificar.');
                }else {
                    if (response.status == 204) {
                        alert('Cadastro realizado com sucesso!');
                    }
                }
            }).catch(function (error) {
                console.error(error);
            });
            navigation.navigate('SignIn');
        }catch (err) {
            alert('Falha no Cadastro de Usuários!');
        }  
    }
    
    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='flex items-center '>
                <Text className='mt-20 text-3xl font-bold text-white'>CADASTRE-SE</Text>
                <Text className='mt-2 text-xs text-[#4BB146]'>Faça seu cadastro</Text>
            </View>
            <View className='mt-10 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe seu nome'
                    value={nome}
                    onChangeText={setNome}>
                </TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe seu email'
                    value={email}
                    onChangeText={setEmail}>
                </TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe sua senha' 
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}>
                </TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Confirme sua senha'
                    secureTextEntry={true} 
                    value={cnfPassword}
                    onChangeText={setCnfPassword}>
                </TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe celular'
                    value={celular}
                    onChangeText={setCelular}>
                </TextInput>
            </View>
            <View className='flex flex-row items-center justify-between w-full h-auto mt-10'>
                <Text 
                    className='text-white text-md font-semibold ml-20'>
                    RECEBER NOTIFICAÇÕES?    
                </Text>
                <Switch
                    className='mr-20'
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <TouchableOpacity className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text onPress={handleCadastra} className='font-bold text-white'>CADASTRE-SE</Text>
            </TouchableOpacity>
            <View className=''>
                <Text>{keyCan}</Text>
            </View>
            <View className='flex items-center w-full h-auto mt-8'>
                <Image className='ml-2 mt-12 w-24 h-12 '
                    source={require('../../assets/logo.png')}  
                />
            </View> 
        </View>
    )
}