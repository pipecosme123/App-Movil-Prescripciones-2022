import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import stylesGlobal from "../css/stylesGlobal";
import { BLANCO, ROJO } from "../Constants/constants";

const Buttons = ({ children, outline = false, color = ROJO, onPress }) => {
  return (
    <View style={styles.Buttons}>
      <TouchableOpacity
        style={[
          stylesGlobal.btn,
          outline
            ? {
                backgroundColor: BLANCO,
                color: color,
                borderWidth: 1.5,
                borderColor: color,
              }
            : {
                borderWidth: 1.5,
                borderColor: color,
                backgroundColor: color,
                color: BLANCO,
              },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            stylesGlobal.btn_text,
            outline
              ? {
                  color: color,
                }
              : {
                  color: BLANCO,
                },
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Buttons: {
    width: "100%",
  },
});

export default Buttons;
