import { View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native'
import styles from './style'
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Home2() {
    const navigation = useNavigation()
 return (
    <View style={styles.container}>
        <View style={styles.topHome}>
          <Text style={styles.topText}>Medicamentos</Text>
            <TouchableOpacity style={styles.buttonTop}>
              <Octicons name="person" size={24} color="#d6dde7" />
            </TouchableOpacity>
          <TextInput style={styles.inputTop}><AntDesign name="search1" size={24} color="black" /></TextInput>
      </View>
      <View style={styles.contentHome}>
      <ScrollView style={styles.scrollView}>
        {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Dipirona (40MG)</Text>
            </View>
                <Text style={styles.description}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Detalhes</Text>
            </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
      </View>
      <View style={styles.navigationBar}>
          <TouchableOpacity  style={styles.buttonBar} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="chatbubble" size={24} color="#d6dde7"/>
            <Text style={{ color:'#d6dde7'}}>Historico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBar}>
            <FontAwesome name="home" size={24} color="#5e17eb" />
            <Text style={{ color:'#5e17eb'}}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBar} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={24} color="#d6dde7" />
            <Text style={{ color:'#d6dde7'}}>Você</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}