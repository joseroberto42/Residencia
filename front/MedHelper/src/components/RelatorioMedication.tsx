import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'; // Para formatação de datas

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: number;
    schedule: string;
    brand: string;
    days: number;
    created_at: string; 
}

const MedicationReport: React.FC = () => {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedications = async () => {
            let currentUserId: number | undefined;

            // Tenta obter o ID do usuário, seja via props ou AsyncStorage
            const storedUserId = await AsyncStorage.getItem('userId');
            currentUserId = storedUserId ? parseInt(storedUserId, 10) : undefined;

            if (currentUserId === undefined) {
                setError('ID do usuário não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    setError('Token não encontrado. Faça login novamente.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/medications/${currentUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMedications(response.data);
            } catch (err) {
                setError('Erro ao buscar medicamentos');
            } finally {
                setLoading(false);
            }
        };

        fetchMedications();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    // Função para verificar se a data é válida
    const isValidDate = (date: string): boolean => {
        const parsedDate = new Date(date);

        // Verifique se a data foi corretamente convertida
        return !isNaN(parsedDate.getTime()); // Verifica se a data é válida
    };

    // Função para formatar a data de forma segura
    const safeFormatDate = (date: string) => {
        if (date) {
            const parsedDate = new Date(date); // converte a string para um objeto Date
            if (isValidDate(date)) {
                return format(parsedDate, 'dd/MM/yyyy HH:mm'); // Formata a data de forma segura
            } else {
                return 'Data inválida'; // Mensagem de fallback
            }
        }
        return 'Data não disponível'; // Se não houver data
    };

    const renderItem = ({ item }: { item: Medication }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>Dosagem: {item.dosage}</Text>
            <Text style={styles.cardText}>Frequência: {item.frequency} vezes/dia</Text>
            <Text style={styles.cardText}>Horário: {item.schedule}</Text>
            <Text style={styles.cardText}>Marca: {item.brand}</Text>
            <Text style={styles.cardText}>Dias: {item.days}</Text>

            {/* Exibindo a data de adição */}
            <Text style={styles.cardText}>
                Adicionado em: {safeFormatDate(item.created_at)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    card: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default MedicationReport;
