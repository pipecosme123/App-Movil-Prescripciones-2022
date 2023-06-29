import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import stylesGlobal from "../css/stylesGlobal";

const ItemProductos = ({ name, url }) => {
  return (
    <View style={styles.ItemProductos}>
      <View style={styles.ImageContent}>
        <Image style={styles.imagenItemList} source={{ uri: url }} />
      </View>
      <View>
        <Text style={styles.name_producto}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemProductos: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ImageContent: {
    width: '10%',
    marginRight: 30,
  },
  imagenItemList: {
    width: 50,
    height: 50,
  },
  name_producto: {
    width: "80%",
    ...stylesGlobal.color_oscuro
  },
});

export default ItemProductos;
