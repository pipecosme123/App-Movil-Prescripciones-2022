import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { baseURL } from '../Constants/constants';
import stylesGlobal from '../css/stylesGlobal';

const ItemList = ({ imagen, nombres }) => {
   return (
      <View style={styles.ItemList}>
         <Image style={styles.imagenItemList} source={{uri: `${baseURL}/img?key=${imagen}`}} />
         <Text style={styles.text}>{nombres}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   ItemList: {
      width: '100%',
      padding: 10,
      flexDirection: 'column',
      alignItems: 'center'
   },
   imagenItemList: {
      width: 130,
      height: 130
   },
   text: {
      width: '100%',
      textAlign: 'center',
      ...stylesGlobal.color_oscuro,
      fontSize: 13
   },
   isSelected: {
      backgroundColor: "blue"
   }
});

export default ItemList;