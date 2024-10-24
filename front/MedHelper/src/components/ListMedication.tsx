import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Medication {
    id: number;
    name: string;
    dosage: string;
    frequency: number;
    schedule: string;
    brand: string;
    days: number;
}

interface MedicationListProps {
    userId?: number; // userId é opcional
    onEdit?: (id: number) => void; // Função onEdit opcional
}

const MedicationList: React.FC<MedicationListProps> = ({ userId, onEdit }) => {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedications = async () => {
            let currentUserId: number | undefined = userId;

            if (currentUserId === undefined) {
                const storedUserId = await AsyncStorage.getItem('userId');
                currentUserId = storedUserId ? parseInt(storedUserId, 10) : undefined;
            }

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
                        'Authorization': `Bearer ${token}`,
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
    }, [userId]);

    const renderItem = ({ item }: { item: Medication }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>Dosagem: {item.dosage}</Text>
            <Text>Frequência: {item.frequency} vezes por dia</Text>
            <Text>Horário: {item.schedule}</Text>
            <Text>Marca: {item.brand}</Text>
            <Text>Dias: {item.days}</Text>
            {onEdit && <Button title="Editar" onPress={() => onEdit(item.id)} />}
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <FlatList
            data={medications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default MedicationList;
