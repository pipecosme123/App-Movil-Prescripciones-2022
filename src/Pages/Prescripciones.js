import React, { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormsInputs from '../Components/FormsInputs';
import { Productos } from '../Constants/Productos';
import TapsProductos from '../Components/TapsProductos';
import ItemListPres from '../Components/ItemListPres';
import PrintToPDFs from '../Components/PrintToPDFs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Prescripciones = ({ navigation }) => {

   const [info, setInfo] = useState({
      cedula: '',
      nombre: '',
      apellido: '',
      descripcion: ''
   });

   const [modalVisible, setModalVisible] = useState(false);
   const [productos, setProductos] = useState([]);

   const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
   let date = new Date();

   const onChangeItems = (data) => {
      setInfo({
         ...info,
         [data.name]: data.value
      })
   }

   const cargarProductos = async () => {
      await AsyncStorage.setItem('@productos', JSON.stringify(Productos))
   }

   const handleProductos = (seleccion) => {
      setProductos(seleccion)
      setModalVisible(false)
   }

   useEffect(() => {
      cargarProductos();
   }, []);

   return (
      <ScrollView >
         <ScrollView horizontal={true}>
            <View style={styles.Prescripciones}>
               <Text style={styles.tituloPagina}>Generar Prescripción</Text>
               <Text style={styles.nombreDoctor}>{`Dr(a).:`} Daniel Felipe Cosme</Text>
               <Text style={[styles.seccion, styles.fecha]}>Fecha: {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Text>
               <View style={styles.seccion}>
                  <FormsInputs label={'Nro. de cédula'} type={'numeric'} nameImput={'cedula'} placeholder={'C. C.'} items={info.cedula} onChangeItems={onChangeItems} />
               </View>
               <View style={styles.seccion}>
                  <FormsInputs label={'Nombre del paciente'} type={'default'} nameImput={'nombre'} placeholder={'Nombre'} items={info.nombre} onChangeItems={onChangeItems} />
               </View>
               <View style={styles.seccion}>
                  <FormsInputs label={'Apellido del paciente'} type={'default'} nameImput={'apellido'} placeholder={'Apellido'} items={info.apellido} onChangeItems={onChangeItems} />
               </View>

               {/* ////////// MODAL \\\\\\\\\\ */}
               <View style={styles.seccion}>

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
                              <TapsProductos handleProductos={handleProductos} />
                           </View>
                        </View>
                     </Modal>
                  </View>

                  <View style={styles.productosSeleccionados}>
                     <View>
                        {productos.length !== 0 &&
                           <FlatList
                              data={productos}
                              keyExtractor={(key) => { return key.id }}
                              renderItem={({ item }) => (
                                 <ItemListPres img={item.img} title={item.name} />
                              )}
                           />
                        }
                     </View>
                  </View>
               </View>

               <View style={styles.seccion}>
                  <FormsInputs label={'Descripción'} type={'default'} nameImput={'descripcion'} placeholder={'Descripción'} multiline={true} items={info.descripcion} onChangeItems={onChangeItems} />
               </View>
               <Text>Telefono: {"425 5412"}</Text>

               <PrintToPDFs />
               {/* <Button
                  title="Generar Prescripción" style={styles.button}
                  onPress={() => console.log(productos)}
               />

               <Button
                  title="Login"
                  onPress={() => navigation.navigate('Login')}
               /> */}

            </View>
         </ScrollView>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   Prescripciones: {
      width: windowWidth,
      paddingHorizontal: 10,
      paddingBottom: 30,
      backgroundColor: '#D6D6D6'
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
   buttonOpenModal: {
      // width: '50%',
      padding: 10,
      backgroundColor: "#d2010d",
      borderRadius: 10
   },
   seccion: {
      marginVertical: 2.5,
      padding: 10,
      backgroundColor: '#F3F3F3',
      borderRadius: 10
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
   }
});

export default Prescripciones;