import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; 

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
             <Text className='mt-2 ml-2 text-white font-bold '>{data.tipDescricao}</Text>
             <Text className='mt-2 mr-2 text-white font-bold '>{moment(data.solAbertura).utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss')}</Text>
          </View>  
          <View>
            <Text className='mt-2 text-white font-bold ml-2'>{data.solTitulo}</Text>
          </View>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};

export default ListSolicitacao;