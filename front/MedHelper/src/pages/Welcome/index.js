import { View,Text,TouchableOpacity,Image} from 'react-native';
import styles from './style'; 
import * as Animatable from 'react-native-animatable'
import { useNavigation} from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation()
 return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Animatable.Image
                animation='fadeInDown'
                duration={6000}
                style={{width:'100%'}}
                resizeMode='contain'
                source={require('../../assents/Logo1.png')}
            />
        </View>
      <Animatable.View 
      style={styles.containerText} 
      animation='fadeInUp'
      duration={3000}>
            <Animatable.Text style={styles.welcome} animation='fadeInRight' duration={5000}>Seja Bem vindo ao MedHelper</Animatable.Text>
            <Animatable.Text style={styles.textWelcome} animation='fadeInRight' duration={6000}>Monitore a rotina dos seus Pacientes
            de um modo mais simples</Animatable.Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Login') }>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
  );
}