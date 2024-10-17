import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import styles from './style';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

interface User {
  name: string;
  email: string;
  password: string;
  birthdate: string; // Formato YYYY-MM-DD
  gender: 'Masculino' | 'Feminino' | 'Outro';
  ethnicity: string;
}

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>(''); // Formato dd/mm/yyyy
  const [gender, setGender] = useState<'Masculino' | 'Feminino' | 'Outro'>('Masculino');
  const [ethnicity, setEthnicity] = useState<string>('Branco');

  // Função para formatar a data de dd/mm/yyyy para o formato YYYY-MM-DD
  const formatBirthdate = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const user: User = {
      name,
      email,
      password,
      birthdate: formatBirthdate(birthdate),
      gender,
      ethnicity,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register/', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      }
    } catch (error: any) {
      console.log('Erro:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível registrar o usuário');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Animatable.Image
            animation="flipInY"
            duration={1000}
            style={{ width: '100%' }}
            resizeMode="contain"
            source={require('../../assents/Logo1.png')}
          />
          <View style={styles.containerRegister}>
            <Text style={styles.textRegister}>Faça sua inscrição</Text>
          </View>
        </View>

        <View style={styles.containerInput}>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TextInput
              placeholder="Seu nome completo"
              style={styles.textInput}
              placeholderTextColor="#FFF"
              value={name}
              onChangeText={setName}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TextInput
              placeholder="Seu Email"
              style={styles.textInput}
              placeholderTextColor="#FFF"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TextInput
              secureTextEntry
              placeholder="Sua Senha"
              style={styles.textInput}
              placeholderTextColor="#FFF"
              value={password}
              onChangeText={setPassword}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TextInput
              secureTextEntry
              placeholder="Confirme sua Senha"
              style={styles.textInput}
              placeholderTextColor="#FFF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TextInput
              placeholder="Data de nascimento (dd/mm/yyyy)"
              style={styles.textInput}
              placeholderTextColor="#FFF"
              value={birthdate}
              onChangeText={setBirthdate}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <Text style={styles.textLabel}>Selecione seu gênero:</Text>
            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue as 'Masculino' | 'Feminino' | 'Outro')}
            >
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <Text style={styles.textLabel}>Selecione sua etnia:</Text>
            <Picker
              selectedValue={ethnicity}
              style={styles.picker}
              onValueChange={(itemValue) => setEthnicity(itemValue)}
            >
              <Picker.Item label="Branco" value="Branco" />
              <Picker.Item label="Negro" value="Negro" />
              <Picker.Item label="Pardo" value="Pardo" />
              <Picker.Item label="Indígena" value="Indígena" />
              <Picker.Item label="Amarelo" value="Amarelo" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={3000}>
            <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
              <Text style={styles.textButton}>Inscreva-se</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHelp}>
              <Text style={styles.textHelp}>
                Ajuda <AntDesign name="question" size={20} color="white" />
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </ScrollView>
  );
}

