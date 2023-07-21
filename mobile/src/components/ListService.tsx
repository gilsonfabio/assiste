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
    //const token = await AsyncStorage.getItem('auth.token');
    
    //if (!token) {
    //    navigation.navigate('SignIn')
    //}else {
        navigation.navigate(data.srvLink)
    //}        
  }
  
  return (
    <TouchableOpacity onPress={handleDetalhes}>
      <View className=''>
        <View className='flex items-center bg-sky-600 w-28 h-28 rounded mt-2 ml-1'>
          <Image source={{uri: `https://i.ibb.co/${data.srvImage}`}} resizeMode="contain" className='mt-2 w-14 h-14' />
          <Text className='mt-3 text-white font-bold'>{data.srvDescricao}</Text>
        </View>             
      </View>  
    </TouchableOpacity>
  );
};
  
export default ListService;

/*
<View className='flex items-center bg-sky-600 w-28 h-28 rounded mt-2 ml-4'>
  <Image source={{uri: `https://i.ibb.co/${data.srvImage}`}} resizeMode="contain" className='mt-2 w-14 h-14' />
  <Text className='mt-3 text-white font-bold'>{data.srvDescricao}</Text>
</View>
*/