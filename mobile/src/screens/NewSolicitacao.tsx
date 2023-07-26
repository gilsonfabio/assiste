import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, Image, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import SelectEspecializacao from '../components/SelectEspecializacao';
import SelectTipo from '../components/SelectTipo';

type Nav = {
    navigate: (value: string) => void;
}

type tiposProps = {
    tipId: number;
    tipDescricao: string;
}

type especializacoesProps = {
    espId: number;
    espDescricao: string;
}

export default function NewSolicitacao(){
    const [tipo, setTipo] = useState('');
    const [especializacao, setEspecializacao] = useState('');
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');    
    
    const [candidato, setCandidato] = useState([]);
    const [contato, setContato] = useState([]);

    const [tipos, setTipos] = useState<Array<tiposProps>>([]);
    const [especializacoes, setEspecializacoes] = useState<Array<especializacoesProps>>([]);
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [celular, setCelular] = useState('');
    const [autContato, setAutContato] = useState('');
    const { signIn }: any = useContext(AuthContext);
    const [news, setNews] = useState([]);

    const idServ = 2;
    const idCon = 1;
    const idCan = 1;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation<Nav>();

    const width = Dimensions.get('window').width;

    async function handleCadastra(){              
        try {
            api.post('newSolicitacao', {
                solIdServ: idServ, 
                solTipo: tipo, 
                solContato: contato, 
                solTitulo: titulo, 
                solDescricao: texto, 
                solCandidato: candidato, 
                solEspecializacao: especializacao
            }).then(() => {
                alert('Solicitação cadastrada com sucesso!')
            }).catch(() => {
                alert('Erro no cadastro!');
            })  
            navigation.navigate('Servicos');
        }catch (err) {
            alert('Falha no Cadastro de Solicitação!');
        }  
    }

    useEffect(() => {
          
        getData();
           
        api({
            method: 'get',    
            url: `tipos`,                 
        }).then(function(response) {
            setTipos(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso dos Tipos de Solicitações! Tente novamente.`);
        })

        api({
            method: 'get',    
            url: `especializacoes`,                 
        }).then(function(response) {
            setEspecializacoes(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso das Especializações de Solicitações! Tente novamente.`);
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
                <Text className='mt-2 text-lg font-bold text-white'>CADASTRE SOLICITAÇÃO</Text>
            </View>
            <Text className='text-white text-[10px] ml-4 mt-3 '>Tipo de solicitação:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <SelectTipo options={tipos} setTipo={setTipo} texto={'Selecione a opção'}  /> 
            </View> 
            <Text className='text-white text-[10px] ml-4 mt-3 '>Especialização:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <SelectEspecializacao options={especializacoes} setEspecializacao={setEspecializacao} texto={'Selecione a especialização'}  /> 
            </View>      
            <Text className='text-white text-[10px] ml-4 mt-3 '>Titulo:</Text>       
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe titulo da solicitação'
                    value={titulo}
                    onChangeText={setTitulo}>
                </TextInput>
            </View>
            <Text className='text-white text-[10px] ml-4 mt-3 '>Descrição Solicitação:</Text>
            <View className='mt-1 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='w-80 text-black'                     
                    placeholder='Informe sua solicitação'
                    editable
                    multiline
                    numberOfLines={8}
                    maxLength={300} 
                    value={texto}
                    onChangeText={setTexto}>
                </TextInput>
            </View>            
            <TouchableOpacity className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text onPress={handleCadastra} className='font-bold text-white'>ENVIAR SOLICITAÇÃO</Text>
            </TouchableOpacity> 
            <View className='flex items-center justify-center w-full mt-10'>
                <Image className='mt-8 w-40 h-20 '
                    source={require('../../assets/logo.png')}  
                /> 
            </View>    
        </View>
    )
}