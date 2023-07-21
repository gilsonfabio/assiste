import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Nav = {
    navigate: (
      value: string, 
      city: any
    ) => void;
}

type histProps = {
    hdeId: number;
    hdeDenId: number;
    hdeData: string;
    hdeHora: string;
    hdeDescricao: string;
    hdeStatus: string;
}

type paramsProps = {
  city: string;
  lan: string;
  lon: string;
}

const width = Dimensions.get('window').width - 5; 

const LisDenHist = ({ data }:any ) => {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  
  function handleDetalhes(){
    setTimeout(() => {
      handleGetToken()
    }, 1000)        
  }
  
  function handleGetToken() {
    //navigation.navigate('Previsao', {city: data.citCodIbge});
  }
  
  return (
    <TouchableOpacity onPress={() => {}}>
      <View className=''>
        <View className='flex flex-col justify-between items-center bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>
          <View className='flex flex-row justify-between items-center w-full'>
            <Text className='mt-1 ml-2 text-white text-md font-bold'>{data.hdeData}</Text>
            <Text className='mt-1 mr-2 text-white font-bold'>{data.hdeHora}</Text>            
          </View>
          <View className='flex flex-row justify-between items-center w-full'>
            <Text className='mt-1 ml-2 text-white font-bold'>{data.hdeDescricao}</Text>
          </View>  
        </View>             
      </View>  
    </TouchableOpacity>
  );
};
  
export default LisDenHist;
