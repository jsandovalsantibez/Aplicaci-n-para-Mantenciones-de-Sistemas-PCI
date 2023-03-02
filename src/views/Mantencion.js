import { StyleSheet, Text, View, Button, Keyboard, 
    Platform, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';


class Mantencion extends React.Component{
    constructor(props){
        super(props)
        this.state={

            nombre_tiendas: [],
            selecion_tienda: '',
            tipo: '',

            api: "192.168.100.40" //Depende de tu direccion IPv4
        }
    }
cambioVista = ()=>{

    const{seleccion_tienda, tipo} = this.state;

    if(tipo == 'deteccion'){
        this.props.navigation.navigate('Dispositivos',
        {tienda: seleccion_tienda, Tipo: tipo})
    } else if (tipo == 'extincion'){
        this.props.navigation.navigate('DISextincion',
        {tienda: seleccion_tienda, Tipo: tipo})
    } else if (tipo == 'audio'){
        this.props.navigation.navigate('Audio',
        {tienda: seleccion_tienda, Tipo: tipo})

    }

    
};



componentDidMount() {
    const {api} = this.state;
    fetch('http://'+api+'/ingelecsa/mantencion/')
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
        this.setState({ nombre_tiendas: datosRespuesta})    
    })
    .catch((error)=>{
        console.log(error);
    })
};





render(){
    

    let tienda = this.state.nombre_tiendas.map((seleccion_tienda)=>{
        return(
        <Picker.Item 
            label={seleccion_tienda.nombre_tienda}
            key={seleccion_tienda.cod_tienda} value={seleccion_tienda.nombre_tienda}></Picker.Item>
            )
        })
    return(
    <SafeAreaView style={styles.container}>
        <Text>Tienda: </Text>
        <Picker 
            selectedValue={this.state.seleccion_tienda}
            onValueChange={(value)=> this.setState({seleccion_tienda:value})}
            style={styles.textInput}>
                {tienda}
        </Picker>
        
        <Text>Tipo: </Text>
        <Picker selectedValue={this.state.tipo}
            onValueChange={(value) => this.setState({tipo:value})}>
                <Picker.Item label='Detección' value={"deteccion"}/>
                <Picker.Item label='Extinción' value={"extincion"}/>
                <Picker.Item label='Audio' value={"audio"}/>
        </Picker>

        <Button title='ir' onPress={this.cambioVista()}/>
            </SafeAreaView>
        )
    }

}export default Mantencion;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "android" ? 35:0,
    }
})

