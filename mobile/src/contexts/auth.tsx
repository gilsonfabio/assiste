import React, { useState, createContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../Services/api';

type Nav = {
    navigate: (value: string) => void;
}

type storageProps = {
	"dados": {
		"usrId": number;
		"usrNome": string;
		"usrEmail": string;
		"usrCandidato": string;
	},
	"token": string;
	"refreshToken": string;
}

export const AuthContext = createContext({})

function AuthProvider({children}: any){
    const [user, setUser] = useState({});
    const navigation = useNavigation<Nav>();
    const [usuario, setUsuario] = useState(null);
    const [candidato, setCandidato] = useState(null);

    async function signIn(email: string, password:string) {
        if(email !== '' && password !== ''){            
            await api({
                method: 'post',    
                url: `signInCon`,
                data: {
                  email,
                  password
                },       
            }).then(function(response) { 
                const { usrCandidado, usrEmail, usrId, usrNome } = response.data.dados;    

                //console.log(usrCandidado);
                //console.log(usrEmail);
                //console.log(usrId);
                //console.log(usrNome);    

                handleSetDados(usrId, usrCandidado)

                navigation.navigate("Servicos")           

            }).catch(function(error) {
                alert(error)
                alert(`Falha no login Contato! Tente novamente. ${email}`);
            })                   
        } 
    }

    const handleSetDados = async (usrId, usrCandidato) => {
        if (usrId != null && usrCandidato != null) { 
            await AsyncStorage.setItem('auth.conId', JSON.stringify(usrId))
            await AsyncStorage.setItem('auth.conCandidato', usrCandidato)
        }    
        /*
        await AsyncStorage.setItem('auth.token', response.token)
        await AsyncStorage.setItem('auth.refreshToken', response.refreshToken)
        await AsyncStorage.setItem('auth.conNomCompleto', response.dados.usrNome)
        await AsyncStorage.setItem('auth.conEmail', response.dados.usrEmail)

        const jsonConId = JSON.stringify(response.dados.usrId)
        await AsyncStorage.setItem('auth.conId', jsonConId)

        const jsonCanId = JSON.stringify(response.dados.usrCandidato)
        await AsyncStorage.setItem('auth.conCandidato', jsonCanId)
        */
    }

    return(
        <AuthContext.Provider value={{signIn, user  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;