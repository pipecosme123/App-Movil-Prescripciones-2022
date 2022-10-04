import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';

// PÁGINAS \\
import Login from '../Pages/Login';
import Prescripciones from '../Pages/Prescripciones';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
   return (
      <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Prescripciones" component={Prescripciones} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
   );
};


const styles = StyleSheet.create({
   container: {
     flex: 1,
    // //  paddingTop: Constants.statusBarHeight,
    //  backgroundColor: '#D6D6D6'
   },
 });

export default MainNavigator;