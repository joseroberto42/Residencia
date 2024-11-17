import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/Login/Index'
import Welcome from '../pages/Welcome/index'
import Register from '../pages/Register/index'
import Layout from './layout';
import Home from '../pages/Home';
import Profille from '../pages/Perfil/index'
import RelatorioMedication from '../components/RelatorioMedication'
const Stack = createNativeStackNavigator()
export default function Routes(){
    return( 
    
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='Login'
                component={Login}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='Register'
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Home'
                component={Home}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name='RelatorioMedication'
                component={RelatorioMedication}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name='Profille'
                component={Profille}
                options={{headerShown: false}}
            />
              <Stack.Screen
                name='Tabs'
                component={Layout} 
                options={{ headerShown: false }}
            />
       
        </Stack.Navigator>
        
    )    

}