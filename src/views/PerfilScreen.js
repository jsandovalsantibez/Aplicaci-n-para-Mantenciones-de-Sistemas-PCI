import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const Perfil = ({navigation}) => {
  return (
    <View style={[ styles.container]}>
      <View style={[ styles.imageContainer]}>
        <Image
          style={styles.bgImage}
          source={require('../../assets/planos.png')}
        />
        <Image 
          source ={require('../../assets/user2.png')} 
          style={{width: 100, height: 100, marginTop: '10%'}}/>
        <Text style={styles.titlePerfil}> Kokensio </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style= {styles.cargo}>
          <Image source={require('../../assets/maletin.png')} style={styles.icons}/>    cargo
        </Text>
        <Text style= {styles.correo}><Image source={require('../../assets/correo-electronico.png')} style={styles.icons}/>    correo
        </Text>
        <Text style= {styles.telefono}><Image source={require('../../assets/telefono.png')} style={styles.icons}/>    Teléfono
        </Text>
   

    </View>
    </View>
);

};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#465679",
    flexDirection: 'column'
  },
  imageContainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#465679",
    flex: 0.8,
    flexDirection: 'column',
  },
  bgImage:{
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  infoContainer:{
    flexDirection: "column",
    backgroundColor: "#E4E5E7",
    flex: 2,
    justifyContent: "center",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50 
  },
  icons: {
    width: 25,
    height: 25
  },
  titlePerfil:{
    flex: 0.8, 
    backgroundColor: '#465679', 
    color: 'white', 
    fontSize: 22, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    fontWeight: "bold"
  },
  cargo:{
    fontSize: 18, 
    marginLeft: 80, 
    marginBottom: 50, 
    color: "#465679", 
    fontWeight: "bold"
  },
  correo:{
    fontSize: 18, 
    marginLeft: 80, 
    marginBottom: 50, 
    color: "#465679", 
    fontWeight: "bold"
  },
  telefono:{
    fontSize: 18, 
    marginLeft: 80, 
    marginBottom: 50, 
    color: "#465679", 
    fontWeight: "bold"
  }
});




export default Perfil;

