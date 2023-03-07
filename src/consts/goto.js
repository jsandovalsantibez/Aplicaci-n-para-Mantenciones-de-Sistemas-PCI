import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from './colors';

const goto = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/*<Text style={styles.modalText}></Text>*/}
            <TouchableOpacity style = {{...styles.buttonOn}} onPress={() => navigation.navigate('Mantencion')}>
              <Text style = {{...styles.ButtonText,}}>    Mantencion    </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{...styles.buttonOn}} onPress={() => navigation.navigate('DocGeneration')}>
              <Text style = {{...styles.ButtonText,}}> Hoja de servicios</Text>
            </TouchableOpacity>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Mostrar Tareas</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '70%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 30,
    elevation: 2,
    backgroundColor: 'grey',
    marginTop: 50,
  },
  buttonOpen: {
    backgroundColor: 'grey',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    margin: 10,
  },
  buttonOn:{
    alignSelf: 'center',
    marginTop: 50,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#34434D',
    width: '60%',
  },
  ButtonText:{
    textAlign: 'center',
    color: '#f1f1f1',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default goto;
