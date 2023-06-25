import React from 'react'
import {View, Text} from "react-native";
import { useNavigation } from '@react-navigation/native';

const DetService = () => {
    return (
        <View className="flex-1 items-center justify-center bg-[#16568A]">
            <Text className='text-white text-[12px] font-bold'>Detalhes do Serviço</Text>
        </View>
    )
}

export default DetService;

