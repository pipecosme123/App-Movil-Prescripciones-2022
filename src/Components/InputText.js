import React from "react";
import { StyleSheet, Text, View } from "react-native";
import stylesGlobal from "../css/stylesGlobal";

const InputText = ({ title, data = "", style = {}}) => {
  return (
    <View style={[styles.InputText, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  InputText: {
    marginVertical: 4
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    ...stylesGlobal.color_azul
  },
  data: {
    fontSize: 16,
    textAlign: 'justify'
  },
});

export default InputText;
