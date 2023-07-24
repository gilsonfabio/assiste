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

type ageProps = {
  data: {
    ageCanId: number;
    ageDatInicial: string;
    ageHorInicial: string;
    ageDatFinal: string;
    ageHorFinal: string;
    ageDescricao: string;
  }  
}

const width = Dimensions.get('window').width - 5; 

const ListAgenda = ({ data }:ageProps) => {
  const navigation = useNavigation<Nav>();
  
    return (
    <TouchableOpacity onPress={() => {}}>
      <View>
        <View className='flex flex-col bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
          <View className='w-full h-auto '>             
             <Text className='mt-2 ml-2 text-white font-bold '>{moment(data.ageDatInicial).utcOffset('-03:00').format('DD/MM/YYYY')}</Text>
             <Text className='mt-2 ml-2 text-white font-bold '>{data.ageHorInicial}</Text>
          </View>  
          <View>
            <Text className='mt-2 ml-2 mb-2 text-white font-bold '>{data.ageDescricao}</Text>            
          </View>
        </View>        
      </View>  
    </TouchableOpacity>
  );
};

export default ListAgenda;