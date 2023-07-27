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

type newProps = {
  data: {
    newId: number;
    newDescricao: string;
    newData: string;
    newAutor: string;
    newLink: string;
  }  
}

const width = Dimensions.get('window').width - 5; 

const ListNews = ({ data }:newProps) => {
  const navigation = useNavigation<Nav>();
  
  function handleHisDenuncias({data}) {
    let denuncia = 1;
    //navigation.navigate('HisDenuncia', {denId: denuncia})
  }

  return (
    <View className='flex items-center mt-2 '>
        <View className='flex bg-sky-900 w-80 h-auto rounded' >       
          <View className='flex flex-row justify-between w-auto h-auto ml-2 mr-2  '>
            <Text className='mr-2 text-md text-white font-bold '>ID:{data.newId}</Text>
            <Text className='ml-2 text-md text-white font-bold '>{moment(data.newData).utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss')}</Text>             
          </View>
          <View className='flex flex-col w-auto h-auto ml-2 mr-2 '>
            <Text className='mr-2 mt-1 text-md text-white font-bold '>{data.newDescricao}</Text>
            <Text className='mt-3 text-xs text-white font-bold '>{data.newAutor}</Text>             
          </View>            
          <TouchableOpacity onPress={() => handleHisDenuncias({ data })} className='flex justify-center items-center w-full mt-2 mr-4 p-2'>
            <Text className='text-xs text-green-600 uppercase'>Leia notícia completa</Text>            
          </TouchableOpacity>
        </View>        
    </View>  
  );
};

export default ListNews;
