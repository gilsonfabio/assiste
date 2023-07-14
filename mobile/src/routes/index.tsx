import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome';
import NewUser from '../screens/NewUser';
import SignIn from '../screens/SignIn';
import Servicos from '../screens/Servicos';
import DetService from '../screens/DetService';
import Solicitacoes from '../screens/Solicitacoes';
import NewSolicitacao from '../screens/NewSolicitacao';
import Cursos from '../screens/Cursos';
import Empregos from '../screens/Empregos';
import Denuncias from '../screens/Denuncias';
import NewDenuncia from '../screens/NewDenuncia';
import Utilidades from '../screens/Utilidades';
import Clima from '../screens/Clima';
import NossoTrabalho from '../screens/NossoTrabalho';
import Previsao from '../screens/Previsao';

type navigationProps = {
    Welcome: undefined;
    NewUser: undefined;
    SignIn: undefined;
    Servicos: undefined;
    DetService: undefined;
    Solicitacoes: undefined;
    NewSolicitacao: undefined;
    Cursos: undefined;
    Empregos: undefined;
    Denuncias: undefined;
    NewDenuncia: undefined;
    Utilidades: undefined;
    Clima: undefined;
    NossoTrabalho: undefined;
    Previsao: {city: any | undefined}
}

const Stack = createNativeStackNavigator<navigationProps>();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/> 
            <Stack.Screen name="NewUser" component={NewUser} options={{headerShown:false}}/>    
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/> 
            <Stack.Screen name="Servicos" component={Servicos} options={{headerShown:false}}/>
            <Stack.Screen name="DetService" component={DetService} options={{headerShown:false}}/> 
            <Stack.Screen name="Solicitacoes" component={Solicitacoes} options={{headerShown:false}}/>
            <Stack.Screen name="NewSolicitacao" component={NewSolicitacao} options={{headerShown:false}}/> 
            <Stack.Screen name="Cursos" component={Cursos} options={{headerShown:false}}/>
            <Stack.Screen name="Empregos" component={Empregos} options={{headerShown:false}}/>     
            <Stack.Screen name="Denuncias" component={Denuncias} options={{headerShown:false}}/>      
            <Stack.Screen name="NewDenuncia" component={NewDenuncia} options={{headerShown:false}}/>  
            <Stack.Screen name="Utilidades" component={Utilidades} options={{headerShown:false}}/>
            <Stack.Screen name="Clima" component={Clima} options={{headerShown:false}}/>  
            <Stack.Screen name="NossoTrabalho" component={NossoTrabalho} options={{headerShown:false}}/>                      
            <Stack.Screen name="Previsao" component={Previsao} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}
