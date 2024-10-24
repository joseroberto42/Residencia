import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import * as Animatable from 'react-native-animatable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função de login
    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Sucesso', 'Login realizado com sucesso!');

                // Armazenar userId e token no AsyncStorage
                await AsyncStorage.setItem('userId', data.userId.toString()); // Armazena o ID do usuário
                await AsyncStorage.setItem('token', data.token); // Armazena o token

                console.log('User ID armazenado:', data.userId); // Verificação do userId

                navigation.navigate('Tabs');
            } else {
                console.log('Erro', data.message || 'Erro ao realizar o login.');
            }

        } catch (error) {
            console.error(error);
            console.log('Erro', 'Erro ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Animatable.Image
                    animation='flipInY'
                    duration={1000}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                    source={require('../../assents/Logo1.png')}
                />
                <View style={styles.containerWelcome}>
                    <Text style={styles.textWelcome}>MedHelper</Text>
                </View>
            </View>
            <View style={styles.form}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        keyboardType='email-address'
                        placeholderTextColor="#FFF"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                        placeholderTextColor="#FFF"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.optionText}>Inscrever-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Text style={styles.optionText}>Manter Logado</Text>
                        <Ionicons name="bookmark-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
