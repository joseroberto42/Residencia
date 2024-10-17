import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/Login/Index'
import Welcome from '../pages/Welcome/index'
import Register from '../pages/Register/index'

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

        </Stack.Navigator>
    )    

}