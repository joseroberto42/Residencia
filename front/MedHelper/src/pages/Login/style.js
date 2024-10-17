import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#5e17eb'
    },
    logoContainer:{
        flex:2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form:{
        flex:2,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#5e17eb',
        fontSize: 16,
        color: '#fff',
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    optionText: {
        color: '#fff',
        fontSize: 14,
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#5AC8FA',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },  
    forgotPasswordText: {
        color: '#fff',
        fontSize: 14,
    },
    textWelcome:{
        color: '#fff',
        fontSize: 14,
        fontSize: 28,
        fontWeight: 'bold',
    },
    containerWelcome:{
        alignItems:'center',
        paddingTop:'15%',
    }
})

export default styles