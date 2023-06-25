import React, { useState, createContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Services/api';

type Nav = {
    navigate: (value: string) => void;
}

export const AuthContext = createContext({})

function AuthProvider({children}: any){
    const [user, setUser] = useState({});
    const navigation = useNavigation<Nav>();

    function signIn(email: string, password:string) {
        if(email !== '' && password !== ''){            
            api({
                method: 'post',    
                url: `signInCon`,
                data: {
                  email,
                  password
                },       
            }).then(function(response) {
                AsyncStorage.setItem('auth.token', response.data.token)
                AsyncStorage.setItem('auth.refreshToken', response.data.refreshToken)
                AsyncStorage.setItem('auth.conNomCompleto', response.data.user.conNomCompleto)
                AsyncStorage.setItem('auth.conEmail', response.data.user.conEmail)

                const jsonConId = JSON.stringify(response.data.user.conId)
                AsyncStorage.setItem('auth.conId', jsonConId)

                const jsonCanId = JSON.stringify(response.data.user.conCandidato)
                AsyncStorage.setItem('auth.conCandidato', jsonCanId)
                
                //api.defaults.headers['x-access-token'] = `${response.data.token}`;
        
                //setUser(user)

                //alert(`Token de acesso: ${response.data.token}`)

                navigation.navigate("Servicos")

            }).catch(function(error) {
                alert(`Falha no login Contato! Tente novamente. ${email}`);
            })                   
        } 
    }

    return(
        <AuthContext.Provider value={{signIn, user  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;