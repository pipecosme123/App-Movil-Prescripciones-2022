import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ROJO } from "../Constants/constants";

const Title = ({ children, color = ROJO }) => {
  return (
    <View style={styles.Title}>
      <View style={[styles.divider, { backgroundColor: color }]} />
      <View>
        <Text style={[styles.textTitle, { color: color }]}>{children}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  Title: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
    marginHorizontal: 15,
  },
  divider: {
    flex: 1,
    height: 1,
  },
});

export default Title;
