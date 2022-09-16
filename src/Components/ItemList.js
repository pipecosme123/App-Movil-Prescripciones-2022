import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ItemList = ({ img, title }) => {
   return (
      <View style={styles.ItemList}>
         <Image style={styles.imagenItemList} source={img} />
         <Text style={styles.text}>{title}</Text>
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
      width: '70%',
      textAlign: 'center'
   },
   isSelected: {
      backgroundColor: "blue"
   }
});

export default ItemList;