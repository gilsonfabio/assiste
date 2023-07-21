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
    <TouchableOpacity onPress={() => handleHisSolicitacoes({ data })}>
      <View>
        <View className='flex flex-col bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
          <View className='w-full h-auto '>             
             <Text className='mt-2 ml-2 text-white font-bold '>{moment(data.solData).utcOffset('-03:00').format('DD/MM/YYYY HH:mm:ss')}</Text>
          </View>  
          <View>
            <Text className='mt-2 ml-2 mb-2 text-white font-bold '>{data.solTitulo}</Text>            
          </View>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};

export default ListSolicitacao;