import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import stylesGlobal from "../css/stylesGlobal";

const FormsInputs = ({
  control,
  label,
  type = "default",
  name,
  placeholder,
  multiline,
  rules = {},
}) => {
  const minHeight = 50;
  const [isFocusI, setIsFocusI] = useState(false);

  const [height, setHeight] = useState(minHeight);

  const handleContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    let valor;

    if (height > minHeight) {
      valor = height;
    } else {
      valor = minHeight;
    }

    setHeight(valor);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[styles.FormsInputs, styles.FormsInputseError]}>
          <Text
            style={[
              stylesGlobal.labelInput,
              isFocusI ? styles.isFocusedLabel : stylesGlobal.color_oscuro,
              error && styles.labelError,
            ]}
          >
            {label}
          </Text>

          <TextInput
            keyboardType={type}
            style={[
              styles.input,
              isFocusI && styles.isFocused,
              { height: multiline ? height : 50 },
              error && styles.inputError,
            ]}
            value={value}
            placeholder={placeholder}
            multiline={multiline ? true : false}
            onFocus={() => setIsFocusI(true)}
            onBlur={() => setIsFocusI(false)}
            onChangeText={onChange}
            onContentSizeChange={multiline && handleContentSizeChange}
          />
          {error && (
            <Text style={styles.textError}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    ></Controller>
  );
};

const styles = StyleSheet.create({
  FormsInputs: {
    width: "100%",
    marginBottom: 500,
  },
  FormsInputseError: {
    marginBottom: 0,
  },
  labelError: {
    color: "#d2010d",
  },
  input: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: "#e5e5e6",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 10,
    color: "#595655",
  },
  heightInput: {
    height: 50,
  },
  inputError: {
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#d2010d",
  },
  isFocused: {
    borderBottomWidth: 2,
    borderWidth: 1,
    borderColor: "#009CA6",
    backgroundColor: "#f5f5f5",
  },
  isFocusedLabel: {
    color: "#009CA6",
  },
  textError: {
    marginLeft: 5,
    color: "#d2010d",
  },
});

export default FormsInputs;
