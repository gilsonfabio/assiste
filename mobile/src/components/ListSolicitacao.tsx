import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; 

type Nav = {
  navigate: (
    value: string, 
    solId: any
  ) => void;
}

type solProps = {
  data: {
    solId: number;
    solData: string;
    solTitulo: string;
    solDescricao: string;
    solNews: number;
    tipDescricao: string;
  }  
}

const width = Dimensions.get('window').width - 5; 

const ListSolicitacao = ({ data }:solProps) => {
  const navigation = useNavigation<Nav>();
  
  function handleHisSolicitacoes({data}) {
    let solicitacao = data.solId;

    console.log('Nro da Solicitação:',solicitacao);
    navigation.navigate('HisSolicitacao', {solId: solicitacao})
  }

  return (
    <View>
      <View className='flex flex-col bg-sky-900 w-80 h-auto rounded mt-2 ml-1 mb-2 '>
        <View className='flex flex-row justify-between w-full h-auto'>          
          <View className='' >             
             <Text className='mt-2 ml-2 text-md text-white font-bold '>{data.tipDescricao}</Text>
          </View>           
          <View className='w-auto h-auto '>             
             <Text className='mt-2 mr-2 text-md text-white font-bold '>{moment(data.solData).utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss')}</Text>
          </View>
        </View>            
        <View>
          <Text className='mt-2 ml-2 mb-2 text-xs text-white font-bold '>{data.solTitulo}</Text>            
        </View>       
        <TouchableOpacity onPress={() => handleHisSolicitacoes({ data })} className='flex justify-center items-center w-full mt-2 mr-4 p-3 bg-green-600 '>
          <Text className='text-white uppercase'>Acompanhe sua solicitação</Text>
        </TouchableOpacity>
        <View className={data.solNews === 0 ? 'hidden' : 'flex items-center justify-center bg-red-500 w-5 h-5 rounded-full absolute mt-20 ml-5'}>
          <Text className='text-white font-bold'>{data.solNews}</Text>      
        </View>              
      </View> 
      
    </View>  
  );
};

export default ListSolicitacao;