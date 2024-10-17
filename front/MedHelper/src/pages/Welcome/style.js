import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
 container:{
    flex: 1,
    backgroundColor: '#5e17eb',    
 },
 logoContainer:{
    flex:2,
    justifyContent:'center',
    alignItems: 'center' 
},
containerText:{
    flex:1,
    backgroundColor: '#FFF' ,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
},
welcome:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom : 13,
    marginTop: 10
},
textWelcome:{
    fontSize: 13,

},
buttonContainer:{
    position: 'absolute',
    backgroundColor: '#5e17eb',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    paddingVertical: 8,
    alignItems:'center',
    justifyContent: 'center'
},
buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
}

})
export default styles