import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AZUL } from '../Constants/constants';

const NotConection = () => {
   return (
      <View style={styles.NotConection}>
         <Feather name="wifi-off" size={60} color={AZUL} />
         <View style={styles.ContentText}>
            <Text style={styles.Texto}>No se puede establecer la conexión a internet</Text>
            <Text style={{}}>Revisa tu conexión a internet para continuar</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   NotConection: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   ContentText: {
      width: '80%',
      marginVertical: 20,
      alignItems: 'center'
   },
   Texto: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '700'
   }

});

export default NotConection;