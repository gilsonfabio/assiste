import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type SolicitacaoProps = {
  idServ: number;
  srvDescricao: string;
  srvImage: string;
}

const width = Dimensions.get('window').width - 5; 

const ListSolicitacao = ({ data }:any) => {
  const navigation = useNavigation();
  
  function handleDetalhes(){
    
  }

  return (
    <TouchableOpacity onPress={handleDetalhes}>
      <View>
        <View className='flex bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
          <View className='flex flex-row justify-between w-full h-auto '>
             <Text className='ml-2 text-white font-bold '>{data.tipDescricao}</Text>
             <Text className='mr-2 text-white font-bold '>{data.solAbertura}</Text>
          </View>  
          <View>
            <Text className='text-white font-bold ml-2'>{data.solTitulo}</Text>
          </View>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};

export default ListSolicitacao;