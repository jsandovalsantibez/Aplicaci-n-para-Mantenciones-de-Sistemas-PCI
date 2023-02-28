import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  Keyboard,  
  ScrollView, 
  Modal } from 'react-native';

function Table(props) {
    const { data } = props;

    const [selectedItem, setSelectedItem] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const Boton_OK = (item)=>{
        //Alert.alert(item.id_ext);
    };

    const Boton_Problema = (item)=>{
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        const updatedItem = { ...selectedItem, name: nameInputValue, age: ageInputValue, city: cityInputValue };
        // Aquí debes llamar a la API para actualizar el objeto actualizado en la base de datos
        console.log('Updated item:', updatedItem);
        Keyboard.dismiss();
        setIsModalVisible(false);
    };
  
    return (
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Id</Text>
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
            <Text style={[styles.cell, { flex: 2 }]}>{item.id_ext}</Text>
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
          <Text style={styles.modalTitle}>Enter Details:</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Age" />
          <TextInput style={styles.input} placeholder="City" />
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
    
class DISextincion extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dis_extincion: [],
            api: "192.168.0.154" //cambiar a ip correspondiente
        }
    }

componentDidMount(){
    const {api} = this.state;
    const { tienda } = this.props.route.params;

    fetch('http://'+api+'/ingelecsa/extincion/?insertar=1',{
        method:"POST",
        body:JSON.stringify(tienda)
    })
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
        console.log(datosRespuesta);
        this.setState({ dis_extincion: datosRespuesta})   
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
            <Table data={this.state.dis_extincion} />
          </View>
        </ScrollView>
    )
  }
    
}export default DISextincion;

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
});

