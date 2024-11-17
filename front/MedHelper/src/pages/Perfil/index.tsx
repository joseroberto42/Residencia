import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen: React.FC = () => {
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Erro', 'Token de autenticação não encontrado. Faça login novamente.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar informações do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        Alert.alert('Editar Perfil', 'Função de editar perfil ainda não implementada.');
    };

    const handleChangePassword = () => {
        Alert.alert('Alterar Senha', 'Função de alterar senha ainda não implementada.');
    };

    const handleViewHistory = () => {
        navigation.navigate('RelatorioMedication');
       
    };

    const handleLogout = () => {
        Alert.alert('Sair', 'Sessão encerrada com sucesso.');
    };

    const handleDeleteAccount = () => {
        Alert.alert('Deletar Conta', 'Sua conta foi excluída.');
    };

    const toggleNotifications = () => {
        setNotificationsEnabled((prevState) => !prevState);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar informações do usuário.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Exibição de Informações Pessoais */}
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{userData.name}</Text>
                <Text style={styles.profileEmail}>{userData.email}</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>

            {/* Configurações de Notificações */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configurações de Notificações</Text>
                <View style={styles.row}>
                    <Text>Notificações de Lembretes</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                    />
                </View>
            </View>

            {/* Histórico de Uso */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Histórico</Text>
                <TouchableOpacity onPress={handleViewHistory}>
                    <Text style={styles.linkText}>Visualizar Histórico de Medicamentos</Text>
                </TouchableOpacity>
            </View>

            {/* Segurança e Privacidade */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Segurança e Privacidade</Text>
                <TouchableOpacity onPress={handleChangePassword}>
                    <Text style={styles.linkText}>Alterar Senha</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.linkText}>Sair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteAccount}>
                    <Text style={styles.deleteText}>Deletar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileEmail: {
        color: '#888',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    linkText: {
        color: '#007BFF',
        marginBottom: 10,
    },
    deleteText: {
        color: 'red',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default ProfileScreen;
