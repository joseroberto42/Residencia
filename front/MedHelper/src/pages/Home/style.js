import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F6FAFF',    
     },
     topHome:{
        flex:1,
        backgroundColor: '#F6FAFF'
     },
     topText:{
        color:'#597492',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        paddingTop: '10%'
     },
     buttonTop:{
        position: 'absolute',
        left: '90%',
        paddingTop: '12%',
     },
     inputTop:{
        backgroundColor:'#d6dde7',
        borderRadius: 5,
        height: 50,
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: '15%',
     },
     navigationBar:{
        height:'10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: '10%',
        paddingEnd: '10%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFF'
     },
     buttonBar:{
        alignItems: 'center'
    },
    contentHome:{
        flex:3,
        backgroundColor: '#F6FAFF',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    card: {
        backgroundColor: '#F6FAFF',
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: '#5e17eb', // Cor de fundo azul semelhante à imagem
        width: '113%',
        alignSelf: 'center',
        position: 'absolute',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    description: {
        fontSize: 14,
        color: '#7A7A7A',
        textAlign: 'center',
        marginBottom: 20,
        marginTop:50
    },
    button: {
        backgroundColor: '#4AC4E3',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
})
export default styles