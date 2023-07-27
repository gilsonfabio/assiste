import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'; 

type Nav = {
  navigate: (
    value: string, 
  ) => void;
}

type quaProps = {
  data: {
    id: number;
    desc: number;
  }  
}

const width = Dimensions.get('window').width - 5; 

const ListQuadro = ({ data }:quaProps) => {
  const navigation = useNavigation<Nav>();
  
  return (
    <TouchableOpacity onPress={() => {}}>
      <View>
        <View className='flex flex-col bg-sky-600 w-96 h-auto rounded mt-2 ml-1'>          
            <Text className='mt-2 ml-2 mb-2 text-white font-bold '>{data.desc}</Text>            
        </View>
      </View>  
    </TouchableOpacity>
  );
};

export default ListQuadro;