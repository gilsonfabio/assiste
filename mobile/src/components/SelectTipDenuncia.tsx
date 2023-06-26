import React, { useState} from 'react';
import { View, TouchableOpacity, Text, Modal, SafeAreaView, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { useHorizontalStackLayout } from 'react-native-reanimated-carousel/lib/typescript/layouts/stack';

type tiposProps = {
    tdeId: number;
    tdeDescricao: string;
}

const SelectTipDenuncia = ({options, setTipo, texto }) => {
    const [txt, setTxt] = useState(texto);
    const [modalVisible, setModalVisible] = useState(false);
    
    function renderOption(item:tiposProps) {
        return (
            <TouchableOpacity className='' onPress={() => {
                setTipo(item.tdeId);
                setTxt(item.tdeDescricao);
                setModalVisible(false);
            }}>
                <Text className='text-[12px] ' >{item.tdeDescricao}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <TouchableOpacity 
                className='flex flex-row border-gray-400 h-7 w-full items-center justify-between p-1 '
                onPress={() => setModalVisible(true)} 
            >
                <Text className='text-[14px] font-semibold text-gray-400 '>{txt}</Text>
                <AntDesign name="caretdown" size={12} color="black" />
                <Modal                     
                    animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
                    <View className='flex-row bg-gray-300 border-gray-600 h-auto w-80 items-center justify-between p-1'>
                        <FlatList 
                            data={options}
                            keyExtractor={(item) => String(item.tdeId)} 
                            renderItem={({item}) => renderOption(item)}
                        />
                        <View>
                            <TouchableOpacity 
                                className='' 
                                onPress={() => setModalVisible(false)} 
                            >
                                <AntDesign name="caretup" size={12} color="black" />
                            </TouchableOpacity>
                        </View>                        
                    </View>    
                </Modal>
            </TouchableOpacity>
        
        
        
        </>       
    )


} 


export default SelectTipDenuncia;