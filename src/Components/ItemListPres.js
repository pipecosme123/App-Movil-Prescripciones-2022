import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { baseURL } from "../Constants/constants";
import stylesGlobal from "../css/stylesGlobal";

const ItemListPres = ({ imagen, nombres }) => {
  return (
    <View style={styles.ItemListPres}>
      <Image style={styles.imagenItemListPres} source={{ uri: `${baseURL}/img?key=${imagen}` }} />
      <View style={styles.informacion}>
        <Text style={styles.textTitulo}>{nombres}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemListPres: {
    width: "95%",
    paddingHorizontal: 5,
    paddingVertical: 20,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#D6D6D6",
  },
  informacion: {
    width: "70%",
    paddingLeft: 20,
  },
  imagenItemListPres: {
    width: 100,
    height: 100,
  },
  textTitulo: {
    width: "100%",
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    ...stylesGlobal.color_azul
  },
  textSubtitulo: {
    width: 200,
    paddingRight: 20,
    fontSize: 10,
    textAlign: "justify",
  },
  isSelected: {
    backgroundColor: "blue",
  },
});

export default ItemListPres;
