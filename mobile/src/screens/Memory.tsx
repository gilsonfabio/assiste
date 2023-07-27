import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListQuadro from '../components/ListQuadro';

type Nav = {
  navigate: (value: string) => void;
}

function Agenda() {
  const navigation = useNavigation<Nav>();
  
  const quadros = [
    {id: 1, desc: 1},
    {id: 2, desc: 1},
    {id: 3, desc: 2},
    {id: 4, desc: 2},
    {id: 5, desc: 3},
    {id: 6, desc: 3},
    {id: 7, desc: 4},
    {id: 8, desc: 4},
    {id: 9, desc: 5},
    {id: 10, desc: 5},
    {id: 11, desc: 6},
    {id: 12, desc: 6},
    {id: 13, desc: 7},
    {id: 14, desc: 7},
    {id: 15, desc: 8},
    {id: 16, desc: 8},
    {id: 17, desc: 9},
    {id: 18, desc: 9},
    {id: 19, desc: 10},
    {id: 20, desc: 10},
  ];
  
  return (
    <View className='flex-1 bg-[#16568A]'>
      <FlatList
        data={quadros}
        className='w-full'
        numColumns={4}
        renderItem={({ item }) => <ListQuadro data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Agenda;