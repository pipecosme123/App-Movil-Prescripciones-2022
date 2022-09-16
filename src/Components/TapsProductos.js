import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Productos } from '../Constants/Productos';
import ItemList from './ItemList';

const TapsProductos = ({ handleProductos }) => {

   const numColumns = 2;

   const listTab = [
      { id: 0, categoria: "Todos" },
      { id: 1, categoria: "Periogard" },
      { id: 2, categoria: "Endodoncia" },
      { id: 3, categoria: "Sensibilidad" },
   ]

   const [categoria, setCategoria] = useState('Todos');

   const [productosStorage, setProductosStorage] = useState([]);

   const [selected, setSelected] = useState([]);

   const setCategoriaFilter = (categoria) => {
      if (categoria !== "Todos") {
         setSelected([...productosStorage.filter(e => e.categoria === categoria)])
      } else {
         setSelected(productosStorage)
      }
      setCategoria(categoria)
   }

   const hadleOnPress = (item) => {
      const newItemSelected = selected.map((val) => {
         if (val.id === item.id) {
            return {
               ...val,
               selected: !val.selected
            }
         } else {
            return val;
         }
      })

      const newItemStorage = productosStorage.map((val) => {
         if (val.id === item.id) {
            return {
               ...val,
               selected: !val.selected
            }
         } else {
            return val;
         }
      })

      subirDatos(newItemStorage);
      setProductosStorage(newItemStorage);
      setSelected(newItemSelected);
   }

   const subirDatos = async (data) => {
      await AsyncStorage.setItem('@productos', JSON.stringify(data))
   }

   const sendProductos = () => {
      let arr = [];
      productosStorage.map((val) => {
         if (val.selected === true) {
            arr.push(val)
         }
      })
      handleProductos(arr);
   }

   const traerDatos = async () => {
      let valor = await AsyncStorage.getItem('@productos');
      valor = JSON.parse(valor);
      setProductosStorage(valor);
      setSelected(valor);
      // setTexto(JSON.parse(valor))
      // Alert.alert(value)
   }

   useEffect(() => {
      traerDatos();
   }, []);

   return (
      <View>

         <Text style={styles.titulo}>Productos</Text>
         <Text style={styles.subtitulo}>Puedes seleccionar uno o varios productos</Text>

         <View style={styles.TapsProductos}>
            <View style={styles.listTab}>
               <FlatList
                  data={listTab}
                  keyExtractor={(key) => { return key.id }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                     <TouchableOpacity style={[styles.btnTabs, categoria === item.categoria && styles.btnTabsActive]} onPress={() => setCategoriaFilter(item.categoria)}>
                        <Text style={[styles.txtTabs, categoria === item.categoria && styles.btnTextActive]}>{item.categoria}</Text>
                     </TouchableOpacity>
                  )}
               />
            </View>

            <View style={styles.listaProductos}>
               <FlatList
                  numColumns={numColumns}
                  data={selected}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                     return (
                        <TouchableOpacity style={[styles.ItemList, item.selected && styles.isSelected]} onPress={() => hadleOnPress(item)}>
                           <ItemList img={item.img} title={item.name} />
                        </TouchableOpacity>
                     )
                  }}
               />
            </View>

            <View style={styles.send}>
               <TouchableOpacity style={styles.buttonSend} onPress={() => sendProductos()}>
                  <Text style={styles.textButtonSend}>Guardar</Text>
               </TouchableOpacity>
            </View>

         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   titulo: {
      fontSize: 30,
      textAlign: 'center',
      color: '#d2010d',
      fontWeight: '800'
   },
   subtitulo: {
      // fontSize: 10,
      fontStyle: 'italic',
      marginBottom: 10,
      color: '#595655'
   },
   TapsProductos: {
      flex: 1,
      paddingHorizontal: 2,
      marginTop: 2
      // justifyContent: 'center'
   },
   listTab: {
      flexDirection: 'row',
      alignSelf: 'center',
      // marginBottom: 10
   },
   btnTabs: {
      width: Dimensions.get('window').width / 3,
      padding: 6,
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderBottomWidth: 0,
      borderColor: 'transparent',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: '#D6D6D6'
   },
   txtTabs: {
      fontSize: 16
   },
   btnTabsActive: {
      backgroundColor: '#fff'
   },
   btnTextActive: {
      color: '#d2010d'
   },
   listaProductos: {
      height: '85%'
   },
   ItemList: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderWidth: 0.9,
      borderColor: "white",
      margin: 1
   },
   isSelected: {
      backgroundColor: "#D9F0F2",
      borderWidth: 0.9,
      borderColor: "#009CA6"
   },
   send: {
      width: '100%',
      alignItems: 'center',
      marginTop: 10
   },
   buttonSend: {
      width: '30%',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      backgroundColor: '#009CA6',
   },
   textButtonSend: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '800'
      // backgroundColor: '#009CA6'
   }
});

export default TapsProductos;