import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import FormsInputs from '../Components/FormsInputs';
import { RoutersLinks } from '../Constants/RoutersLinks';

const Login = ({ navigation }) => {

   const [info, setInfo] = useState({
      nombre: '',
      apellido: '',
      telefono: ''
   });

   const onChangeItems = (data) => {
      setInfo({
         ...info,
         [data.name]: data.value
      })
   }

   return (
      <View style={styles.Login}>
         <Text>Login</Text>

         <FormsInputs label={'Nombre'} type={'default'} nameImput={'nombre'} placeholder={'Nombre'} items={info.nombre} onChangeItems={onChangeItems} />
         <FormsInputs label={'Apellido'} type={'default'} nameImput={'apellido'} placeholder={'Apellido'} items={info.apellido} onChangeItems={onChangeItems} />

         <Button
            title="Loading"
            onPress={() => navigation.navigate('Loading')}
         />

         <Button
            title="ResultadoApi"
            onPress={() => navigation.navigate('ResultadoApi')}
         />

         <Button
            title="Prescripción"
            onPress={() => navigation.navigate('Prescripciones')}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   Login: {

   }
});

export default Login;