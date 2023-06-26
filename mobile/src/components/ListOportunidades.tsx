import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = {
    navigate: (value: string) => void;
}

type ServicesProps = {
  idServ: number;
  srvDescricao: string;
  srvImage: string;
  srvLink: string;
}

const width = Dimensions.get('window').width - 5; 

const ListOportunidades = ({ data }:any) => {
  const navigation = useNavigation<Nav>();
      
  return (
    <View>
      <View className='flex items-center'>
        <View className='flex bg-gray-200 w-[23rem] h-auto ml-2 mt-2 rounded overflow-hidden shadow-lg'>
          <Text className='mt-1 text-black text-sm ml-2'>ID:{data.optId}</Text>
          <Text className='mt-3 text-black text-sm ml-2'>Titulo:</Text>
          <Text className='mt-1 text-black font-bold text-lg ml-2 '>{data.optTitulo}</Text>
          <Text className='mt-3 text-black text-sm ml-2'>Local:</Text>
          <Text className='mt-1 text-black font-bold text-md ml-2'>{data.optLocal}</Text>
          <Text className='mt-3 text-black text-sm ml-2'>Descrição:</Text>
          <Text className='mt-1 text-black font-bold text-md ml-2 border p-2 border-black bg-gray-300 mr-2'>{data.optDescricao}</Text>
          <Text className='mt-3 text-black text-sm ml-2'>Requisitos:</Text>
          <Text className='mt-1 text-black font-bold text-md ml-2 border p-2 border-black bg-gray-300 mr-2'>{data.optRequisitos}</Text>
          <Text className='mt-3 text-black text-sm ml-2'>Link:</Text>
          <Text className='mt-1 text-blue-400 font-bold text-md ml-2'>{data.optLink}</Text>
        </View>        
      </View>  
    </View>
  );
};
  
export default ListOportunidades;