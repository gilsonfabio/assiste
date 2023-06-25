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
      <View>
        <View className='flex items-center bg-sky-600 w-28 h-28 rounded mt-2 ml-4'>
          <Text>ID:{data.optId}</Text>
          <Text className='mt-3 text-white font-bold'>{data.optTitulo}</Text>
          <Text className='mt-3 text-white font-bold'>{data.optLocal}</Text>
          <Text className='mt-3 text-white font-bold'>{data.optDescricao}</Text>
          <Text className='mt-3 text-white font-bold'>{data.optRequisitos}</Text>
          <Text className='mt-3 text-white font-bold'>{data.optLink}</Text>
        </View>        
      </View>  
    </View>
  );
};
  
export default ListOportunidades;