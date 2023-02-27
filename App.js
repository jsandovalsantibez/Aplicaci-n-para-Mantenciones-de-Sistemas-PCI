import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/LoginBoardScreen';
import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import Perfil from './src/views/PerfilScreen';
import DocGeneration from './src/views/DocGeneration';
import Mantencion from './src/views/Mantencion';
import Dispositivos from './src/views/Dispositivos';
import DISextincion from './src/views/DISextincion';
import Audio from './src/views/Audio';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="PerfilScreen" component={Perfil} />
        <Stack.Screen name="DocGeneration" component={DocGeneration} />
        <Stack.Screen name="Mantencion" component={Mantencion} />
        <Stack.Screen name="Dispositivos" component={Dispositivos} />
        <Stack.Screen name="DISextincion" component={DISextincion} />
        <Stack.Screen name="Audio" component={Audio} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
