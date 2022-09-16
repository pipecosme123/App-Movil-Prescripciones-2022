import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ItemListPres = ({ img, title }) => {
   return (
      <View style={styles.ItemListPres}>
         <Image style={styles.imagenItemListPres} source={img} />
         <View style={styles.informacion}>
            <Text style={styles.textTitulo}>{title}</Text>
            <Text style={styles.textSubtitulo}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto nemo fugit laudantium nihil! Ipsa cumque aliquid at impedit. Impedit nemo eaque aperiam temporibus expedita harum earum exercitationem beatae facilis!</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   ItemListPres: {
      width: '95%',
      paddingHorizontal: 5,
      paddingVertical: 20,
      margin: 5,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff'
   },
   informacion: {
      width: '70%',
      paddingLeft: 20
   },
   imagenItemListPres: {
      width: 100,
      height: 100
   },
   textTitulo: {
      width: '100%',
      marginBottom: 10,
      // fontSize: 0,
      fontWeight: '500',
      textAlign: 'left'
   },
   textSubtitulo: {
      width: 200,
      paddingRight: 20,
      fontSize: 10,
      textAlign: 'justify'
   },
   isSelected: {
      backgroundColor: "blue"
   }
});

export default ItemListPres;