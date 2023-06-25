import React from 'react';
import 'react-native-gesture-handler';
import AuthProvider from './src/contexts/auth';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}