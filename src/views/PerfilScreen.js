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
  
  <View style={[ styles.container,
    {
      flexDirection: 'column',
    },
  ]}>
    
    <View style={[ styles.imageContainer,
    {
      flexDirection: 'column',
    }
    ]}>
   
    <Image source ={require('../../assets/user2.png')} style={{width: 100, height: 100, marginTop: '10%'}}/>
    <Text style={{flex: 0.8, backgroundColor: '#465679', color: 'white', fontSize: 22, textAlign: 'center', textAlignVertical: 'center', fontWeight: "bold"}}> 
     Kokensio </Text>
    
    </View>


   
    <View style={styles.infoContainer}>
    
    <Text style= {{fontSize: 18, marginLeft: 80, marginBottom: 50, color: "#465679", fontWeight: "bold"}}><Image source={require('../../assets/maletin.png')} style={styles.icons}/>    cargo
</Text>
    <Text style= {{fontSize: 18, marginLeft: 80, marginBottom: 50, color: "#465679", fontWeight: "bold"}}><Image source={require('../../assets/correo-electronico.png')} style={styles.icons}/>    correo
    </Text>
    <Text style= {{fontSize: 18, marginLeft: 80, marginBottom: 50, color: "#465679", fontWeight: "bold"}}><Image source={require('../../assets/telefono.png')} style={styles.icons}/>    Teléfono
    </Text>
   

    </View>
    </View>
);

};
const styles = StyleSheet.create({
  container: {
  flex:1,
  backgroundColor: "#465679"
},

imageContainer: {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#465679",
  flex: 0.8,


},

infoContainer: {
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
}

});




export default Perfil;

