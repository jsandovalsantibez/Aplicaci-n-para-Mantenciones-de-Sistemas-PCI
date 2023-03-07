import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const DetailsScreen = ({route}) => {
  const place = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground style={{flex: 0.7}} source={place.image}>
        <View style={style.imageDetails}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 20,
            }}>
            {place.name}
          </Text>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
        <View style={{flexDirection: 'row'}}>
        </View>
        <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
          Acerca de:
        </Text>
        <Text style={{marginTop: 20, lineHeight: 22}}>{place.details}</Text>
      </View>
      {/*<View style={style.footer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        //Apartado para agregar Boton que redirecciona directamente a su vista de mantención//
        </View>
      </View>*/}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.3,
  },
  imageDetails: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  /*footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },*/
});

export default DetailsScreen;
