// src/components/MedicationCalendar.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importando o componente Calendar
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface Day {
    dateString: string; // A data em formato de string
    day: number; // O dia do mês
    month: number; // O mês
    year: number; // O ano
}

interface Medication {
    id: number;
    name: string;
    dosage: string;
    days: number; // Dias da semana em que o medicamento deve ser tomado (1 = Domingo, 2 = Segunda, ..., 7 = Sábado)
    createdAt: string; // Data de criação em formato ISO
}

const MedicationCalendar = () => {
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean, medicationIds?: number[] } }>({});

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const userId = await AsyncStorage.getItem('userId');

                if (!token || !userId) {
                    console.error('Token ou ID do usuário não encontrado.');
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/medications/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const medications: Medication[] = response.data;
                const dates: { [key: string]: { marked: boolean, medicationIds?: number[] } } = {};

                medications.forEach((medication) => {
                    const createdAt = new Date(medication.createdAt); // Data de criação
                    const startDate = new Date(createdAt); // Data de início
                    const daysToConsider = medication.days; // Dias da semana
                    const duration = 7; // Duração em dias (ajuste conforme necessário)

                    // Para cada dia da semana em que o medicamento deve ser tomado
                    for (let dayOffset = 0; dayOffset < duration; dayOffset++) { // Ajuste para a quantidade de dias desejada
                        const nextMedicationDate = new Date(startDate);
                        nextMedicationDate.setDate(startDate.getDate() + dayOffset); 

                        const dayOfWeek = nextMedicationDate.getDay() + 1; // 0 (domingo) a 6 (sábado)

                        // Se o dia da semana estiver incluído nos dias de medicação
                        if ((daysToConsider & (1 << dayOfWeek - 1)) !== 0) {
                            const dateString = nextMedicationDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

                            // Marcar a data e armazenar o ID do medicamento
                            if (!dates[dateString]) {
                                dates[dateString] = { marked: true, medicationIds: [] };
                            }
                            dates[dateString].medicationIds!.push(medication.id); // Adiciona o ID do medicamento à lista
                        }
                    }
                });

                setMarkedDates(dates);
            } catch (error) {
                console.error('Erro ao buscar medicamentos:', error);
            }
        };

        fetchMedications();
    }, []);

    const handleDayPress = (day: Day) => {
        const dateKey = day.dateString;
        const medicationsForDate = markedDates[dateKey]?.medicationIds;

        if (medicationsForDate && medicationsForDate.length > 0) {
            Alert.alert(
                `Medicamentos para ${day.dateString}`,
                `Medicamentos: ${medicationsForDate.join(', ')}`,
                [{ text: 'OK' }]
            );
        } else {
            Alert.alert(`Sem medicamentos agendados para ${day.dateString}`);
        }
    };

    const calendarWidth = width > 600 ? '80%' : '100%'; // 80% para telas grandes, 100% para dispositivos menores
    const calendarHeight = height > 600 ? 300 : height * 0.4; // Altura maior para telas grandes

    return (
        <View style={styles.container}>
            <Text>Medicamentos Programados</Text>
            <Calendar
                style={[styles.calendar, { width: calendarWidth, height: calendarHeight }]}
                markedDates={markedDates}
                onDayPress={handleDayPress} // Atualizando o evento onDayPress
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendar: {
        // Você pode adicionar outros estilos aqui, se necessário
    },
});

export default MedicationCalendar;
