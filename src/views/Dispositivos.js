import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Keyboard, 
    Platform, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';

function Table(props) {
    
    const { data } = props;

    
    const [selectedItem, setSelectedItem] = useState(null);

    const [inputDetalle, setDetalle] = useState('');

    const [showModal, setShowModal] = useState(false);

    const Boton_OK = (item)=>{
        //Alert.alert(item.identificador);


        var ident = item.identificador;
        var loca = item.localizacion;

        var datosEnviar = {ident, loca};
        console.log(datosEnviar);
        


        fetch("http://192.168.0.154/ingelecsa/dispositivos/?update1=1",{
        method:"POST",
        body:JSON.stringify(datosEnviar)
    })
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
      console.log(datosRespuesta);
    })
    .catch((error)=>{
      console.log(error);
  })



        
    };

    const Boton_Problema = (item)=>{
      var identi = item.identificador;

        setSelectedItem(identi);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        const updatedItem = { identificador: selectedItem, detalle:inputDetalle };
        console.log(updatedItem);

/*
        fetch("http://192.168.0.154/ingelecsa/dispositivos/?update2=1",{
        method:"POST",
        body:JSON.stringify(updatedItem)
    })
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
      console.log(datosRespuesta);
    })
    .catch((error)=>{
      console.log(error);
  })*/

        
        Keyboard.dismiss();
        setShowModal(false);
    };
  
    return (
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Identificador</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Localizacion</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Estado</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Revision</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Error</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={[
            styles.row,
            index % 2 === 0 ? { backgroundColor: '#f2f2f2' } : null,
          ]}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.identificador}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.localizacion}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.estado}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: 2 }}>
            <Button title=" Revisado" onPress={() => Boton_OK(item)} />
            <Button title=" Error" onPress={() => Boton_Problema(item)} />
          </View>
          </View>
          
        ))}
        
        <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Ingrese detalles:</Text>

          <TextInput style={styles.input} placeholder="Detalle" 
          onChangeText={(inputDetalle)=> setDetalle(inputDetalle)}/>
          
          <TextInput style={styles.input} placeholder="Foto" />

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button title="Cancelar" onPress={handleModalClose} />
            <Button title="guardar" onPress={handleSave} />
          </View>
        </View>
      </Modal>
      
      </View>
      </ScrollView>
    );
  }


class Dispositivos extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            
            dispositivos: [],
            estado: '',
            detalle: '',
            api: "192.168.0.154"

        }
    }

componentDidMount(){
    const {api} = this.state;
    const { tienda } = this.props.route.params;

    fetch('http://'+api+'/ingelecsa/dispositivos/?insertar=1',{
        method:"POST",
        body:JSON.stringify(tienda)
    })
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
  
        this.setState({ dispositivos: datosRespuesta})

        
    })
    .catch((error)=>{
        console.log(error);
    })
};

render(){
    const { tienda } = this.props.route.params;


    return(
        <ScrollView>
        <View style={styles.container}>
            <Text>Tienda: {tienda}</Text>

            <Table data={this.state.dispositivos} />
            
            
            
        </View>
        </ScrollView>
    )
}
    
}export default Dispositivos;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 16, 
        paddingTop: 30, 
        backgroundColor: '#fff' 
    },
    table: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      overflow: 'hidden',
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'black',
      paddingVertical: 10,
    },
    headerCell: {
      padding: 5,
      backgroundColor: 'gray',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },
    cell: {
      padding: 5,
      textAlign: 'center',
      fontSize: 12,
    },
    input:{
      justifyContent: "center",
      width: 350,
      height: 35,
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 8,
      borderWidth: 1,
      paddingLeft: 5,
  },
  });

