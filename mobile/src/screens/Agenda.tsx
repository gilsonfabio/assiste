import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

function Agenda() {
  const running = {key: 'running', color: 'blue'};
  const cycling = {key: 'cycling', color: 'green'};
  const walking = {key: 'walking', color: 'orange'};
  const marked = {
    '2022-12-01': {
      dots: [running, walking]
    },
    '2022-12-02': {
      dots: [running, walking, cycling]
    }
  };
  return (
    <SafeAreaView className='flex-1 justify-center bg-[#16568A]'>
      <Calendar
        initialDate="2022-12-01"
        markingType="multi-dot"
        markedDates={marked}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Agenda;