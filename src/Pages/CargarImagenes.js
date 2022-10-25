import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CargarImagenes = () => {

   const [firma, setFirma] = useState(null);
   const [sello, setSello] = useState(null);

   const pickImage = async (type) => {

      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [16, 9],
         quality: 1,
      });

      if (!result.cancelled) {
         if (type === 'firma') {
            setFirma(result.uri);
         } else {
            setSello(result.uri);
         }
      }
   };

   return (
      <View style={styles.CargarImagenes}>

         <Text style={styles.titulo}>Subir Imagenes</Text>

         <View style={styles.seccionesCarga}>
            <View style={styles.seccion}>

               <TouchableOpacity style={styles.button} onPress={() => pickImage('firma')}>
                  <Text style={styles.textStyle}>Seleccionar Firma</Text>
               </TouchableOpacity>

               <View style={styles.seccionImagen}>
                  {firma ?
                     <Image source={{ uri: firma }} style={styles.imagen} />
                     :
                     <View>
                        <Entypo name="camera" size={40} color="#727272" />
                        <Text>Imagen de la firma del doctor</Text>
                     </View>
                  }
               </View>
            </View>

            <View style={styles.seccion}>

               <TouchableOpacity style={styles.seccionImagen} onPress={() => pickImage('sello')}>
                  {/* <Text style={styles.textStyle}>Seleccionar Sello</Text> */}
                  {/* <View style={styles.seccionImagen}> */}
                     {sello ?
                        <Image source={{ uri: sello }} style={styles.imagen} />
                        :
                        <View>
                           <Entypo name="camera" size={40} color="#727272" />
                           <Text>Imagen de</Text>
                        </View>
                     }
                  {/* </View> */}
               </TouchableOpacity>


            </View>
         </View>

         <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={() => pickImage('sello')}>
            <Text style={styles.textStyle}>Guardar Imagenes</Text>
         </TouchableOpacity>

      </View>
   );
};

const styles = StyleSheet.create({
   CargarImagenes: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   seccionesCarga: {
      width: '100%',
      // height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   },
   seccion: {
      width: '100%',
      marginTop: 10
   },
   titulo: {
      textAlign: 'center',
      justifyContent: 'flex-start',
   },
   button: {
      padding: 10,
      backgroundColor: "#d2010d",
      borderRadius: 10
   },
   textStyle: {
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
   },
   seccionImagen: {
      width: '100%',
      height: 204,
      marginTop: 5,
      backgroundColor: '#bfbfbf',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#727272',
      borderStyle: 'dashed',
   },
   imagen: {
      width: '100%',
      height: 200,
      borderRadius: 10,
   },
   buttonSubmit: {
      width: '100%',
      marginBottom: 20
   }

});

export default CargarImagenes;