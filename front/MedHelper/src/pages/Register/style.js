import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5e17eb',
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInput: {
        flex: 2,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    textRegister: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
    containerRegister: {
        alignItems: 'center',
        paddingTop: '5%',
    },
    textInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#5e17eb', // Mantenha essa cor para o fundo do input
        fontSize: 16,
        color: '#fff',
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },
    buttonRegister: {
        width: '100%',
        backgroundColor: '#5AC8FA',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textHelp: {
        color: '#fff',
        fontSize: 15,
    },
    buttonHelp: {
        alignItems: 'center',
        marginBottom: 10,
    },
    textLabel: { // Estilo adicionado para o texto dos labels (como "Selecione seu gênero")
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    picker: { // Estilo adicionado para o componente Picker
        width: '100%',
        height: 50,
        backgroundColor: '#5e17eb', // Certifique-se de que o fundo corresponda
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        color: '#fff',
        marginBottom: 25,
    },
});

export default styles;
