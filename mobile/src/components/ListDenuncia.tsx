import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    <TouchableOpacity onPress={() => handleHisDenuncias({data})}>
      <View>
        <View className='flex bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
          <View className='flex flex-row justify-between w-full h-auto '>
            <Text className='mr-2 text-white font-bold '>{data.denId}</Text>
            <Text className='ml-2 text-white font-bold '>{data.denData}</Text>             
          </View>  
          <View>
            <Text className='text-white font-bold mt-2 ml-2'>{data.denDescricao}</Text>
          </View>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};

export default ListDenuncia;
