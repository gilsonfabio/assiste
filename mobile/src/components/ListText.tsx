import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

type Nav = {
    navigate: (value: string) => void;
}

type canditadoProps = {
  canId: number;
  canText1: string;
  canText2: string;
  canText3: string;
  canText4: string;
}
const width = Dimensions.get('window').width - 5; 

const ListText = ({ data }:any) => {
  const navigation = useNavigation<Nav>();
  
  function handleDetalhes(){
    setTimeout(() => {
      handleGetToken()
    }, 1000)        
  }
  
  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem('auth.token');
    
    if (!token) {
        navigation.navigate('SignIn')
    }else {
        navigation.navigate(data.srvLink)
    }        
  }
  
  return (
    <ScrollView>
      <View key={data.canId}>
        <View className='flex flex-col items-center justify-center bg-sky-600 w-96 h-auto rounded ml-1 mt-2 '>
          <View>  
            <Text className='mt-3 text-white '>{data.canText1}</Text>
          </View>
          <View>
            <Text className='mt-3 text-white '>{data.canText2}</Text>
          </View>
          <View>  
            <Text className='mt-3 text-white '>{data.canText3}</Text>
          </View>
          <View>  
            <Text className='mt-3 text-white '>{data.canText4}</Text>
          </View>  
        </View>        
      </View>  
    </ScrollView>
  );
};
  
export default ListText;