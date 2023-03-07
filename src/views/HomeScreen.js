import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import places1 from '../consts/places1';
import places2 from '../consts/places2';
import places3 from '../consts/places3';

const {width} = Dimensions.get('screen');


const HomeScreen = ({navigation}) => {
  const categoryIcons = [
      <Icon name="insert-chart" size={32} color={COLORS.primary} onPress={() => navigation.navigate(/*Insertar ruta se navegación*/)}/>,
      <Icon name="account-circle" size={32} color={COLORS.primary} onPress={() => navigation.navigate('PerfilScreen')}/>,
  ];

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card1 = ({places1}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', places1)}>
        <ImageBackground style={style.card1Image} source={places1.image}>
          <Text
            style={style.titleCard}>
            {places1.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const Card2 = ({places2}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', places2)}>
        <ImageBackground style={style.card1Image} source={places2.image}>
          <Text
            style={style.titleCard}>
            {places2.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const Card3 = ({places3}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', places3)}>
      <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground style={style.rmCard3Image} source={places3.image}>
          <Text
            style={style.titleCard}>
            {places3.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      </SafeAreaView>
      </TouchableOpacity>
    );
  };
  
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.grey}}>
      <StatusBar translucent={false} backgroundColor={COLORS.grey} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 80,
            paddingHorizontal: 20,
            borderRadius: 35,
            borderBottomLeftRadius: 35,
          }}>
          <View style={{flex: 1}}>
            <Text style={style.headerTitle}>                      Ingelecsa</Text>
            <Text style={style.headerTitle}>              Entorno de Trabajo</Text>

            </View>
        </View>
        <View style={style.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          
        <View style={style.centeredView}>
          <View style={style.modalView}>
            {/*<Text style={styles.modalText}></Text>*/}
            <TouchableOpacity style = {{...style.buttonOn}} onPress={() => navigation.navigate('Mantencion')}>
              <Text style = {{...style.ButtonText,}}>    Mantencion    </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{...style.buttonOn}} onPress={() => navigation.navigate('DocGeneration')}>
              <Text style = {{...style.ButtonText,}}> Hoja de servicios</Text>
            </TouchableOpacity>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[style.button, style.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={style.textStyle}>Mostrar Tareas</Text>
      </Pressable>
    </View>
        <ListCategories />
          <View>
          <Text style={style.sectionTitleTiendas}>Tiendas</Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places1}
            renderItem={({item}) => <Card1 places1={item} />}
          />
          <Text style={style.sectionTitleLaboratorios}>Laboratorios</Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places2}
            renderItem={({item}) => <Card2 places2={item} />}
          />
          <Text style={style.sectionTitleBodeas}>Bodegas</Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places3}
            renderItem={({item}) => <Card3 places3={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    marginTop: 6,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 22,
  },
  categoryContainer: {
    marginTop: 20,
    marginHorizontal: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 30,
    marginVertical: 20,
    marginTop: 45,
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionTitleTiendas: {
    marginHorizontal: 30,
    marginVertical: 20,
    marginTop: 45,
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.subtitle
  },
  sectionTitleLaboratorios: {
    marginHorizontal: 30,
    marginVertical: 20,
    marginTop: 45,
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.dark
  },
  sectionTitleBodeas: {
    marginHorizontal: 30,
    marginVertical: 20,
    marginTop: 45,
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.orange
  },
  card1Image: {
    height: 220, 
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCard1Image: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  rmCard3Image: {
    width: width - 40,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  titleCard:{
    flex: 0.3, 
    backgroundColor: COLORS.subtitle, 
    color: 'white', 
    fontSize: 18, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    fontWeight: "bold",
    borderRadius: 15,
  },
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  modalView: {
    margin: 20,
    width: '70%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 40,
    padding: 25,
    elevation: 2,
    backgroundColor: COLORS.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: COLORS.subtitle,
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
    fontSize: 15, 
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default HomeScreen;
