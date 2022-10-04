import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Productos } from '../Constants/Productos';
import FormsInputs from '../Components/FormsInputs';
import TapsProductos from '../Components/TapsProductos';
import ItemListPres from '../Components/ItemListPres';
import { useForm } from '../Hooks/useForm';

const windowWidth = Dimensions.get('window').width;

const initialForm = {
   cedula: '',
   nombre: '',
   apellido: '',
   productos: [],
   recomendaciones: '',
   doctor_name: 'Karel Busfield',
   doctor_celula: '1143997339',
   telefono: '3182599197'
}

const validationForm = (form) => {
   let errors = {}

   if (form['cedula'] === '') {
      errors['cedula'] = "Debes llenar este campo";
   } else if (form['cedula'].length > 15) {
      errors["cedula"] = `Límite de caracteres superado. Límite máximo 15`;
   }

   if (form['nombre'] === '') {
      errors['nombre'] = "Debes llenar este campo";
   } else if (form['nombre'].length > 45) {
      errors['nombre'] = `Límite de caracteres superado. Límite máximo 45`;
   }

   if (form['apellido'] === '') {
      errors['apellido'] = "Debes llenar este campo";
   } else if (form['apellido'].length > 45) {
      errors['apellido'] = `Límite de caracteres superado. Límite máximo 45`;
   }

   if (form['productos'].length === 0) {
      errors['productos'] = "Debes seleccionar como mínimo un producto";
   }

   if (form['recomendaciones'].length > 45) {
      errors['recomendaciones'] = `Límite de caracteres superado. Límite máximo 45`;
   }

   return errors;
}

const Prescripciones = ({ navigation }) => {

   const {
      form,
      error,
      showError,
      loading,
      responseApi,
      handleChange,
      handleProductos,
      handleBlur,
      handleSubmit
   } = useForm(initialForm, validationForm);

   const [modalVisible, setModalVisible] = useState(false);
   const [productos, setProductos] = useState([]);

   const getFecha = () => {
      let date = new Date();
      const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
      const fechaActual = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      return (fechaActual);
   }

   // -------------- PROCESO -------------- \\
   const cargarProductos = async () => {
      await AsyncStorage.setItem('@productos', JSON.stringify(Productos))
   }

   const onHandleProductos = (seleccion) => {
      handleProductos(seleccion);
      setModalVisible(false);

      console.log(seleccion.length, 'productos');

      if (seleccion.length === 0) {
         error.add({ productos: "Debes seleccionar como mínimo un producto" });
      } else if (error.productos !== undefined) {
         delete (error.productos)
         // console.log(error, typeof error)
      }
   }

   useEffect(() => {
      cargarProductos();
   }, []);

   return (
      <ScrollView >
         <ScrollView horizontal={true}>
            <View style={styles.Prescripciones}>
               <Text style={styles.tituloPagina}>Generar Prescripción</Text>
               {/* <Text style={styles.nombreDoctor}>{`Dr(a).:`} Daniel Felipe Cosme</Text>
               <Text style={[styles.seccion, styles.fecha]}>Fecha: {getFecha()}</Text> */}
               <View style={[styles.seccion, showError && error['cedula'] && styles.sessionError]}>
                  <FormsInputs label={'Nro. de cédula'} type={'numeric'} nameImput={'cedula'} placeholder={'C. C.'} items={form.cedula} onChangeItems={handleChange} onBlurItems={handleBlur} onShowError={showError} error={error['cedula']} />
               </View>
               <View style={[styles.seccion, showError && error['nombre'] && styles.sessionError]}>
                  <FormsInputs label={'Nombre del paciente'} type={'default'} nameImput={'nombre'} placeholder={'Nombre'} items={form.nombre} onChangeItems={handleChange} onBlurItems={handleBlur} onShowError={showError} error={error['nombre']} />
               </View>
               <View style={[styles.seccion, showError && error['apellido'] && styles.sessionError]}>
                  <FormsInputs label={'Apellido del paciente'} type={'default'} nameImput={'apellido'} placeholder={'Apellido'} items={form.apellido} onChangeItems={handleChange} onBlurItems={handleBlur} onShowError={showError} error={error['apellido']} />
               </View>

               {/* ////////// MODAL \\\\\\\\\\ */}
               <View style={[styles.seccion, showError && error['productos'] && styles.sessionError]}>

                  <TouchableOpacity
                     style={styles.buttonOpenModal}
                     onPress={() => setModalVisible(true)}
                  >
                     <Text style={styles.textStyle}>Seleccionar Productos</Text>
                  </TouchableOpacity>

                  <View style={styles.containerSuperior}>
                     <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                           setModalVisible(!modalVisible);
                        }}
                     >
                        <View style={styles.centeredView}>
                           <View style={styles.modalView}>
                              <TapsProductos handleProductos={onHandleProductos} />
                           </View>
                        </View>
                     </Modal>
                  </View>

                  <View style={styles.productosSeleccionados}>
                     <View>
                        {form.productos.length !== 0 &&
                           <FlatList
                              data={form.productos}
                              keyExtractor={(key) => { return key.id }}
                              renderItem={({ item }) => (
                                 <ItemListPres img={item.img} title={item.name} />
                              )}
                           />
                        }
                     </View>
                  </View>
                  {showError && form.productos.length === 0 &&
                     <Text style={styles.textError}>{error['productos']}</Text>
                  }
               </View>

               <View style={[styles.seccion, error['recomendaciones'] && styles.sessionError]}>
                  <FormsInputs label={'Recomendaciones Adicionales'} type={'default'} nameImput={'recomendaciones'} placeholder={'Recomendaciones'} multiline={true} items={form.recomendaciones} onChangeItems={handleChange} onBlurItems={handleBlur} onShowError={showError} error={error['recomendaciones']} />
               </View>

               <TouchableOpacity
                  style={styles.buttonOpenModal}
                  onPress={handleSubmit}
               >
                  <Text style={styles.textStyle}>Generar Prescripción</Text>
               </TouchableOpacity>

            </View>
         </ScrollView>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   Prescripciones: {
      width: windowWidth,
      paddingHorizontal: 10,
      paddingBottom: 30
   },
   tituloPagina: {
      marginBottom: 10,
      fontSize: 30,
      fontWeight: '800',
      textAlign: 'center',
      color: '#d2010d',
   },
   nombreDoctor: {
      fontStyle: 'italic',
      marginBottom: 10,
      color: '#595655'
   },
   fecha: {
      paddingHorizontal: 20
   },
   buttonOpenModal: {
      padding: 10,
      backgroundColor: "#d2010d",
      borderRadius: 10
   },
   seccion: {
      marginVertical: 2.5,
      padding: 10,
      borderWidth: 1.5,
      borderColor: '#D6D6D6',
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
   },
   sessionError: {
      borderWidth: 1.5,
      borderColor: '#d2010d'
   },
   containerSuperior: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(1,1,1,.5)',
      margin: 0
   },
   modalView: {
      width: '95%',
      height: '95%',
      margin: 20,
      backgroundColor: "#F3F3F3",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
   },
   button: {
      borderRadius: 20,
      height: 20,
      padding: 10,
      elevation: 2
   },
   buttonOpen: {
      backgroundColor: "#d2010d",
   },
   buttonClose: {
      backgroundColor: "#d2010d",
   },
   textStyle: {
      fontSize: 15,
      // height: 20,
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center"
   },
   productosSeleccionados: {
      width: '100%'
   },
   textError: {
      marginLeft: 15,
      color: '#d2010d'
   }
});

export default Prescripciones;