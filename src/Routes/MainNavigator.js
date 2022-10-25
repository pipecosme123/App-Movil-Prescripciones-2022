import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';

// PÁGINAS \\
import Login from '../Pages/Login';
import Prescripciones from '../Pages/Prescripciones';
import Loading from '../Components/Loading';
import ResultadoApi from '../Components/ResultadoApi';
import CargarImagenes from '../Pages/CargarImagenes';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="ResultadoApi" component={ResultadoApi} />
          <Stack.Screen name="Prescripciones" component={Prescripciones} />
          <Stack.Screen name="CargarImagenes" component={CargarImagenes} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
     paddingTop: Constants.statusBarHeight,
    //  backgroundColor: '#D6D6D6'
  },
});

export default MainNavigator;