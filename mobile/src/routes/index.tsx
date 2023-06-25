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
        </Stack.Navigator>
    )
}
