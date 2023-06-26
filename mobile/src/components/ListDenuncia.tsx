import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type DenunciasProps = {
  idServ: number;
  srvDescricao: string;
  srvImage: string;
}

const width = Dimensions.get('window').width - 5; 

const ListDenuncia = ({ data }:any) => {
  const navigation = useNavigation();
  
  function handleDetalhes(){
    
  }

  return (
    <TouchableOpacity onPress={handleDetalhes}>
      <View>
        <View className='flex bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
          <View className='flex flex-row justify-between w-full h-auto '>
             <Text className='ml-2 text-white font-bold '>{data.tdeDescricao}</Text>
             <Text className='mr-2 text-white font-bold '>{data.denData}</Text>
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
