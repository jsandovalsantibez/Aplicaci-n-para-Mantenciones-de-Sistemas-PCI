import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {AsyncStorage} from 'react-native';
import axios from 'axios'

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      correo: '',
      empleado_passw: ''
    }
  }
  
  Logear= async ()=>{
    
    const {correo} = this.state;
    const {empleado_passw} = this.state;
    var enviarData = {correo:correo, empleado_passw:empleado_passw};
    Keyboard.dismiss();

    axios.post('http://192.168.100.40/ingelecsa/login/index.php', enviarData)
    .then(async (resultado)=>{
      if (resultado.data.Status === '200'){
        console.log(resultado);

        try {
          await AsyncStorage.setItem('rut', resultado.data.rut);
          await AsyncStorage.setItem('Nombre', resultado.data.Nombre);
          await AsyncStorage.setItem('Correo', resultado.data.Correo);
          await AsyncStorage.setItem('Cargo', resultado.data.Cargo);
        }catch(error) {
          console.log(error);
        }
        this.props.navigation.navigate("Home");
        
      }
    else {
      alert('Invalid User');
    }
    })


/*
    fetch("http://192.168.100.40/ingelecsa/login/index.php", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body:JSON.stringify({
        correo: correo,
        empleado_passw: empleado_passw,
      }),
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      alert(responseJson);
      if(responseJson == "ok") {
        this.props.navigation.navigate("Home");
      }
    })
    .catch((error)=>{
      console.error("ERROR ENCONTRADO " + error);
  })

*/
};

  render(){

    return(
      <View style={styles.container}>

      <Image
        style={styles.bgImage}
        source={require('../../assets/fondologin.png')}
      /> 
        <View style={styles.logcontainer}>  
          <Image
            style={{width: 300, height: 300, borderRadius: 100, marginTop:-150, marginLeft: 240 }}
            source={require('../../assets/logoycirculo.png')}/>

          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.sub_Titulo}>Inicie sesión para continuar</Text>
          <TextInput
            placeholder="email@ingelecsa.cl"
            onChangeText={(correo) => this.setState({correo})}
            style={styles.textInput}
          />
          <TextInput
          placeholder="clave"
          onChangeText={(empleado_passw) => this.setState({empleado_passw})}
          secureTextEntry={true}
          style={styles.textInput}
          />
      <TouchableOpacity style = {{...styles.Button}} onPress ={() =>{this.props.navigation.navigate('HomeScreen')}}>
        <Text
          style = {{
            ...styles.ButtonText,
          }}
        >
          Iniciar Sesión 
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      </View>
    </View>
  );
  }

}export default Login;


const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  logcontainer:{
    marginTop: "100%",
    height: "100%",
    backgroundColor: 'white',
    borderTopStartRadius: 100,
    alignItems: 'center'
  },
  bgImage:
  {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  titulo: {
    marginTop: -50,
    marginBottom: 20,
    fontSize: 40,
    color: '#34434D',
    fontWeight: 'bold',
  },
  sub_Titulo:{
    fontSize: 15,
    marginBottom: 30,
    color: 'gray',
  },
  descripcion:{
    fontSize: 10,
    color: '#34434D',
    fontWeight: 'bold',
  },
  textInput:{
    marginBottom: 5,
    padding: 5,
    paddingStart: 30,
    width: 300,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#D1D1D1',
    marginVertical: 10

  },
  logo:{
    alignItems: 'flex-end'
  },
  Button:{
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#34434D',
    width: '50%',
  },
  ButtonText:{
    textAlign: 'center',
    color: '#f1f1f1',
  }

});
