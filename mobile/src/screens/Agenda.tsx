import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import api from '../Services/api';
import ListAgenda from '../components/ListAgenda';

type Nav = {
  navigate: (value: string) => void;
}

function Agenda() {
  const navigation = useNavigation<Nav>();
  const [datAtual, setDatAtual] = useState(new Date('2023-07-20'));
  const [idCan, setIdCan] = useState('');
  const [agenda, setAgenda] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [atualiza, setAtualiza] = useState(0);
  const [selected, setSelected] = useState(new Date().toString());
  const [datAgenda, setDatAgenda] = useState('');
  const running = {key: 'running', color: 'blue'};
  const cycling = {key: 'cycling', color: 'green'};
  const walking = {key: 'walking', color: 'orange'};
  const marked = {
    '2022-12-01': {
      dots: [running, walking]
    },
    '2022-12-02': {
      dots: [running, walking, cycling]
    }
  };

  useEffect(() => {
    getData()
      
  }, []);

  useEffect(() => {

    setDatAtual(new Date(selected));
    setDatAgenda(selected);

    if (idCan != null) {
      console.log('Key:', idCan)
      getData()
      api({
          method: 'get',    
          url: `agenda/${idCan}/${selected}`,                 
      }).then(function(resp) {
          setAgenda(resp.data)
      }).catch(function(error) {
          alert(`Falha no acesso a agenda do candidato! Tente novamente.`);
      })
    }   
    
  }, [selected, idCan]);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('auth.conCandidato');

    console.log('Antes ',jsonValue)

    if (jsonValue != null) { 
        setIdCan(jsonValue)
    }else { 
        alert('erro');
    } 
     
  };
   
  async function handleRefreshToken(){
    const refreshToken = await AsyncStorage.getItem('auth.refreshToken');
    const idCon = await AsyncStorage.getItem('auth.conId');
    await api({
        method: 'post',    
        url: `refreshToken`,
        data: {
            idCon,                            
        },
        headers: {
            "x-access-token" : refreshToken    
        },      
    }).then(function(response) {
        AsyncStorage.clear()
        AsyncStorage.setItem('auth.token', response.data.token)
        AsyncStorage.setItem('auth.refreshToken', response.data.refreshToken)
        AsyncStorage.setItem('auth.conNomCompleto', response.data.user.conNomCompleto)
        AsyncStorage.setItem('auth.conEmail', response.data.user.conEmail)
        const jsonConId = JSON.stringify(response.data.user.conId)
        AsyncStorage.setItem('auth.conId', jsonConId)
        const jsonCanId = JSON.stringify(response.data.user.conCandidato)
        AsyncStorage.setItem('auth.conCandidato', jsonCanId)
        setAtualiza(atualiza + 1 )
    }).catch(function(error) {
        alert(`Falha no acesso a agenda! Tente novamente.`);
        navigation.navigate("SignIn");      
    })
  }

  return (
    <SafeAreaView className='flex-1 justify-center bg-[#16568A]'>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        initialDate="2023-07-21"
        markingType="multi-dot"
        markedDates={marked}
      />
      <View>
        <Text>Data da consulta:{datAtual.toString()}</Text>
      </View>
      <FlatList
        data={agenda}
        className=''
        numColumns={1}
        renderItem={({ item }) => <ListAgenda data={item} />}
        keyExtractor={(item) => item.ageHorInicial}
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Agenda;