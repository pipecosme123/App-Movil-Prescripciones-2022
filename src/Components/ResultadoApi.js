import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';
import { Animations } from '../Constants/Animations';
import { shareAsync } from 'expo-sharing';

const ResultadoApi = () => {

   const route = useRoute();
   const navigation = useNavigation();

   const { status, uri_pdf } = route.params;

   const sharePrescripcion = async (url_storage) => {
      // console.log(status, url_storage);
      await shareAsync(FileSystem.documentDirectory + url_storage, { UTI: '.pdf', mimeType: 'application/pdf' });
   }

   return (
      <View style={[StyleSheet.absoluteFillObject, styles.ResultadoApi]}>
         {status ?
            <LottieView
               style={styles.animation_check}
               source={Animations.check}
               autoPlay loop={false}
            />
            :
            <LottieView
               style={styles.animation_wrong}
               source={Animations.wrong}
               autoPlay loop={false}
            />
         }

         {status ?
            <Text style={styles.textResultadoApi}>Prescirpción generanda correctamente</Text>
            :
            <View>
               <Text style={styles.textResultadoApi_wrong}>La prescirpción no se pudo generar correctamente</Text>
               <Text style={styles.textResultadoApi_wrong}>Regresa y vuelve a intentarlo nuevamente</Text>
            </View>
         }

         {status ?
            <View style={styles.bottones}>
               <TouchableOpacity
                  style={styles.buttonReset}
               // onPress={handleSubmit}
               >
                  <Text style={styles.textStyle_Reset}>Regresar</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  style={styles.buttonShare}
                  onPress={() => sharePrescripcion(uri_pdf)}
               >
                  <Text style={styles.textStyle_Share}>Enviar al paciente</Text>
               </TouchableOpacity>
            </View>
            :
            <View style={styles.bottones}>
               <TouchableOpacity
                  style={styles.buttonReset_wrong}
                  onPress={() => navigation.goBack()}
               >
                  <Text style={styles.textStyle_wrong_Reset}>Regresar</Text>
               </TouchableOpacity>
            </View>
         }
      </View>
   );
};

const styles = StyleSheet.create({
   ResultadoApi: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
   },
   animation_check: {
      width: 150
   },
   animation_wrong: {
      width: 80,
      marginBottom: 10
   },
   textResultadoApi: {
      position: 'relative',
      bottom: 20,
      fontSize: 15,
      textAlign: 'center'
   },
   textResultadoApi_wrong: {
      fontSize: 15,
      textAlign: 'center'
   },
   bottones: {
      width: '90%',
      alignItems: 'center'
   },
   buttonShare: {
      width: "90%",
      marginTop: 10,
      padding: 10,
      backgroundColor: "#70cd5f",
      borderRadius: 10
   },
   buttonReset: {
      width: "90%",
      padding: 10,
      backgroundColor: "transparent",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#70cd5f',
   },
   buttonReset_wrong: {
      width: "90%",
      marginTop: 20,
      padding: 10,
      backgroundColor: "transparent",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#d2010d',
   },
   textStyle_Share: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
   },
   textStyle_Reset: {
      fontSize: 15,
      color: '#70cd5f',
      fontWeight: "bold",
      textAlign: "center"
   },
   textStyle_wrong_Reset: {
      fontSize: 15,
      color: '#d2010d',
      fontWeight: "bold",
      textAlign: "center"
   }
});

export default ResultadoApi;