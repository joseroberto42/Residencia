import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface Medication {
    name: string;           // Nome do medicamento
    dosage: string;        // Dosagem do medicamento
    frequency: number;     // Frequência de uso (número de vezes por dia)
    schedule: string;      // Horário de uso (ex: "08:00")
    brand: string;         // Marca do medicamento
    days: number;          // Número de dias que o medicamento deve ser usado
}

const EditMedication: React.FC = () => {
    const [medicationId, setMedicationId] = useState<string>(''); // ID da medicação para buscar
    const [medicationData, setMedicationData] = useState<Medication | null>(null); // Dados da medicação
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const fetchMedicationData = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.get<Medication>(`http://localhost:5000/api/medications/${medicationId}/`);
            setMedicationData(response.data);
            setMessage('Medicação encontrada com sucesso!');
        } catch (error) {
            console.error("Erro ao buscar os dados da medicação:", error);
            Alert.alert('Erro', 'Erro ao buscar os dados da medicação. Verifique se o ID está correto.');
            setMedicationData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!medicationData) return;

        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/medications/${medicationId}/`, medicationData);
            Alert.alert('Sucesso', 'Medicação atualizada com sucesso!');
            setMessage('Medicação atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar a medicação:", error);
            Alert.alert('Erro', 'Erro ao atualizar medicação.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof Medication, value: string | number) => {
        if (medicationData) {
            setMedicationData({ ...medicationData, [field]: value });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Medicação</Text>
            {/* Campo de busca pelo ID da medicação */}
            <View style={styles.searchContainer}>
                <Text>ID da Medicação</Text>
                <TextInput
                    style={styles.input}
                    value={medicationId}
                    onChangeText={setMedicationId}
                    placeholder="Digite o ID da medicação"
                    keyboardType="numeric"
                />
                <Button title="Buscar Medicação" onPress={fetchMedicationData} />
            </View>
            {/* Mensagem de status */}
            {message && <Text style={styles.message}>{message}</Text>}
            
            {/* Formulário para edição */}
            {!loading && medicationData && (
                <View style={styles.formContainer}>
                    <View style={styles.formGroup}>
                        <Text>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value={medicationData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Dosagem</Text>
                        <TextInput
                            style={styles.input}
                            value={medicationData.dosage}
                            onChangeText={(value) => handleInputChange('dosage', value)}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Frequência (vezes por dia)</Text>
                        <TextInput
                            style={styles.input}
                            value={String(medicationData.frequency)}
                            onChangeText={(value) => handleInputChange('frequency', Number(value))}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Horário</Text>
                        <TextInput
                            style={styles.input}
                            value={medicationData.schedule}
                            onChangeText={(value) => handleInputChange('schedule', value)}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Marca</Text>
                        <TextInput
                            style={styles.input}
                            value={medicationData.brand}
                            onChangeText={(value) => handleInputChange('brand', value)}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Número de Dias</Text>
                        <TextInput
                            style={styles.input}
                            value={String(medicationData.days)}
                            onChangeText={(value) => handleInputChange('days', Number(value))}
                            keyboardType="numeric"
                        />
                    </View>
                    <Button title="Salvar Alterações" onPress={handleSubmit} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    formContainer: {
        marginTop: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    message: {
        marginVertical: 10,
        color: 'red', // ou 'green' se a mensagem indicar sucesso
    },
});

export default EditMedication;
