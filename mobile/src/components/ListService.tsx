import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = {
    navigate: (value: string) => void;
}

type ServicesProps = {
  srvId: number;
  srvDescricao: string;
  srvImage: string;
  srvLink: string;
}
const width = Dimensions.get('window').width - 5; 

const ListService = ({ data }:any) => {
  const navigation = useNavigation<Nav>();
  
  function handleDetalhes(){
    setTimeout(() => {
      handleGetToken()
    }, 1000)        
  }
  
  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem('auth.token');
    
    if (!token) {
        navigation.navigate('SignIn')
    }else {
        navigation.navigate(data.srvLink)
    }        
  }
  
  const images = [
    { id: 0, path: require('../../assets/denuncia.png') },
    { id: 1, path: require('../../assets/denuncia.png') },
    { id: 2, path: require('../../assets/solicitacao.png') },
    { id: 3, path: require('../../assets/emprego.png') },
    { id: 4, path: require('../../assets/curso.png') },
    { id: 5, path: require('../../assets/agenda.png') },
    { id: 6, path: require('../../assets/trabalho.png') },
    { id: 7, path: require('../../assets/utilidade.png') },
  ];

  return (
    <TouchableOpacity onPress={handleDetalhes}>
      <View>
        <View className='flex items-center bg-sky-600 w-28 h-28 rounded mt-2 ml-4'>
          <Image source={images[data.srvId].path} resizeMode="contain" className='mt-2 w-14 h-14' />
          <Text className='mt-3 text-white font-bold'>{data.srvDescricao}</Text>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};
  
export default ListService;