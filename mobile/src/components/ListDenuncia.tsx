import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; 

type Nav = {
  navigate: (
    value: string, 
    denId: any
  ) => void;
}

type denProps = {
  data: {
    denId: number;
    denData: string;
    denDescricao: string;
    tdeDescricao: string;
    stdDescricao: string;
  }  
}

const width = Dimensions.get('window').width - 5; 

const ListDenuncia = ({ data }:denProps) => {
  const navigation = useNavigation<Nav>();
  
  function handleHisDenuncias({data}) {
    let denuncia = 1;

    console.log('Nro da Denuncia:',denuncia);
    navigation.navigate('HisDenuncia', {denId: denuncia})
  }

  return (
    <View className='flex items-center mt-2 '>
        <View className='flex bg-sky-900 w-80 h-auto rounded' >       
          <View className='flex flex-row justify-between w-auto h-auto ml-2 mr-2  '>
            <Text className='mr-2 text-md text-white font-bold '>ID:{data.denId}</Text>
            <Text className='ml-2 text-md text-white font-bold '>{moment(data.denData).utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss')}</Text>             
          </View>
          <View className='flex flex-col w-auto h-auto ml-2 mr-2 '>
            <Text className='mr-2 mt-1 text-md text-green-400 font-bold '>{data.tdeDescricao}</Text>
            <Text className='text-md text-green-400 font-bold '>{data.stdDescricao}</Text>             
          </View>            
          <View>
            <Text className='text-white font-bold mt-2 ml-2 mb-2'>{data.denDescricao}</Text>
          </View>
          <TouchableOpacity onPress={() => handleHisDenuncias({ data })} className='flex justify-center items-center w-full mt-2 mr-4 p-3 bg-green-600 '>
            <Text className='text-white uppercase'>Acompanhe sua denuncia</Text>
          </TouchableOpacity>  
        </View>        
    </View>  
  );
};

export default ListDenuncia;
