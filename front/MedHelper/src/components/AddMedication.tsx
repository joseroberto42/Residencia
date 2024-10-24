// src/components/AddMedication.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMedication: React.FC = () => {
    const [medicationName, setMedicationName] = useState('');
    const [medicationDosage, setMedicationDosage] = useState('');
    const [medicationFrequency, setMedicationFrequency] = useState('');
    const [medicationSchedule, setMedicationSchedule] = useState('');
    const [medicationBrand, setMedicationBrand] = useState('');
    const [medicationDays, setMedicationDays] = useState('');

    const handleAddMedication = async () => {
        // Obtém o userId do AsyncStorage e converte para número
        const storedUserId = await AsyncStorage.getItem('userId');
        const userIdValue = storedUserId ? Number(storedUserId) : undefined;

        if (userIdValue === undefined) {
            Alert.alert('Erro', 'ID do usuário não encontrado.');
            return;
        }

        const newMedication = {
            name: medicationName,
            dosage: medicationDosage,
            frequency: Number(medicationFrequency), // Certifique-se que a frequência é um número
            schedule: medicationSchedule,
            brand: medicationBrand,
            days: Number(medicationDays), // Certifique-se que os dias são um número
            userId: userIdValue, // Usar o userId convertido
        };

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/medications/', newMedication, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            Alert.alert('Sucesso', 'Medicação adicionada com sucesso!');
            console.log('Medicação adicionada:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Erro do servidor:', error.response.data);
                Alert.alert('Erro', error.response.data.message || 'Erro desconhecido');
            } else {
                console.error('Erro ao adicionar medicação:', error);
                Alert.alert('Erro', 'Erro ao adicionar medicação');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome do Medicamento"
                value={medicationName}
                onChangeText={setMedicationName}
                style={styles.input}
            />
            <TextInput
                placeholder="Dosagem"
                value={medicationDosage}
                onChangeText={setMedicationDosage}
                style={styles.input}
            />
            <TextInput
                placeholder="Frequência (vezes por dia)"
                value={medicationFrequency}
                onChangeText={setMedicationFrequency}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Horário"
                value={medicationSchedule}
                onChangeText={setMedicationSchedule}
                style={styles.input}
            />
            <TextInput
                placeholder="Marca"
                value={medicationBrand}
                onChangeText={setMedicationBrand}
                style={styles.input}
            />
            <TextInput
                placeholder="Dias"
                value={medicationDays}
                onChangeText={setMedicationDays}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Adicionar Medicamento" onPress={handleAddMedication} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default AddMedication;
