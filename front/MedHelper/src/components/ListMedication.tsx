import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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
    userId?: number;
    onEdit?: (id: number) => void;
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
    }, [userId]);

    const renderItem = ({ item }: { item: Medication }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>{item.name}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.itemText}>Dosagem: {item.dosage}</Text>
                <Text style={styles.itemText}>Frequência: {item.frequency} vezes por dia</Text>
                <Text style={styles.itemText}>Horário: {item.schedule}</Text>
                <Text style={styles.itemText}>Marca: {item.brand}</Text>
                <Text style={styles.itemText}>Dias: {item.days}</Text>
                {onEdit && (
                    <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item.id)}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    list: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    card: {
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    cardHeader: {
        backgroundColor: '#007BFF',
        padding: 10,
    },
    cardHeaderText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContent: {
        padding: 15,
    },
    itemText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default MedicationList;
