import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, Switch, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import SelectSubTipo from '../components/SelectSubTipo';
import SelectTipDenuncia from '../components/SelectTipDenuncia';

type Nav = {
    navigate: (value: string) => void;
}

type dadosProps = {
    tdeId: number;
    tdeDescricao: string;
}

export default function NewDenuncia(){
    const [tipo, setTipo] = useState('');
    const [subtipo, setSubTipo] = useState('');
    const [texto, setTexto] = useState('');
    const [nome, setNome] = useState('');
    const [fone, setFone] = useState('');    
    
    const [dados, setDados] = useState<Array<dadosProps>>([]);
    const [cidade, setCidade] = useState('');
    
    const [candidato, setCandidato] = useState([]);
    const [contato, setContato] = useState([]);

    const idServ = 2;
    const idCon = 1;
    const idCan = 1;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation<Nav>();

    const width = Dimensions.get('window').width;

    async function handleCadastra(){              
        api({
            method: 'get',    
            url: 'https://api.meteum.ai/v1/forecast?lat=-16.686811579124484&lon=-49.265447421592604',
            headers: {
                "X-Meteum-API-Key" : '3d63f76e-4acb-4683-b0d2-a8f54de6ba16'
            },      
          }).then(function(resp) {
                setCidade(resp.data.geo_object.locality.name);
              //setDados(resp.data);
             
          }).catch(function(error) {  
            alert(`Falha no acesso a Previsão do Tempo! Tente novamente.`);              
          })     
    }

    useEffect(() => {
        /*
        api({
            method: 'get',    
            url: `tipdenuncias`,                 
        }).then(function(response) {
            setCidades(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso das Cidades! Tente novamente.`);
        })
        */    

        api({
            method: 'get',    
            url: 'https://api.meteum.ai/v1/forecast?lat=-16.686811579124484&lon=-49.265447421592604',
            headers: {
                "X-Meteum-API-Key" : '3d63f76e-4acb-4683-b0d2-a8f54de6ba16'
            },      
          }).then(function(resp) {
                setCidade(resp.data.geo_object.locality.name);
              //setDados(resp.data);
             
          }).catch(function(error) {  
            alert(`Falha no acesso a Previsão do Tempo! Tente novamente.`);              
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
            <View className='flex items-center mt-10'>
                <Text className='mt-2 text-lg font-bold text-white'>PREVISÃO DO TEMPO</Text>
            </View>
            <Text className='text-white text-[10px] ml-4 mt-3 '>Cidade: {cidade}</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                
            </View> 
            
 
        </View>
    )
}