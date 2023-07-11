import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import api from '../Services/api';
import ListCity from '../components/ListCity';

type Nav = {
    navigate: (value: string) => void;
}

type citiesProps = {
    citCodIbge: string;
    citNome: string;
    citLatitude: string;
    citLongitude: string;
    citCapital: string;
    citUf: string;
    citSiafi: string;
    citDdd: string;
    citFuso: string;
}

export default function Clima(){
    const [city, setCity] = useState('');
    const [cities, setCities] = useState<Array<citiesProps>>([]);
       
    const [candidato, setCandidato] = useState([]);
    const [contato, setContato] = useState([]);
    const navigation = useNavigation<Nav>();

    const width = Dimensions.get('window').width;
    
    function handleSearch () { 
      api({
        method: 'get',    
        url: `cities/${city}`,                 
      }).then(function(response) {
        setCities(response.data)
      }).catch(function(error) {
        alert(`Falha no acesso a base de cidades!`);
      })    
    };

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='flex items-center mt-10'>
                <Text className='mt-2 text-lg font-bold text-white'>PREVISÃO DO TEMPO</Text>
            </View>            
            <Text className='text-white text-sm ml-4 mt-3 '>Cidade:</Text>
            <View className='flex flex-row justify-between'>
              <View className=''>
                <TextInput 
                  className='bg-gray-200 w-64 h-10 ml-2 text-black text-sm rounded-md'                     
                  placeholder='Informe a Cidade'
                  editable
                  value={city}
                  onChangeText={setCity}>
                </TextInput>
              </View>  
              <View>
                <TouchableOpacity className='flex justify-center items-center mr-4 ml-2 p-3 bg-green-600 rounded-md '>
                  <Text onPress={handleSearch} className='font-bold text-white'>BUSCAR</Text>
                </TouchableOpacity>
              </View>
            </View> 
            <FlatList
                data={cities}
                className=''
                numColumns={1}
                renderItem={({ item }) => <ListCity data={item} />}
                keyExtractor={(item) => item.citCodIbge}
            /> 
        </View>
    )
}

/*

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
        api({
            method: 'get',    
            url: `cities`,                 
        }).then(function(response) {
            setCities(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso das Cidades! Tente novamente.`);
        })          
    }, []);

    function busPrevisão() {
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

    */
   