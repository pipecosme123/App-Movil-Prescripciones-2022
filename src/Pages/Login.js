import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormsInputs from "../Components/FormsInputs";
import stylesGlobal from "../css/stylesGlobal";
import { AuthContext } from "../Context/AuthContext";
import Buttons from "../Components/Buttons";

const Login = () => {
  const { control, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { password } = data;
    login({ password }).catch((err) => {
      Alert.alert("¡Error!", err, [{ text: "OK" }]);
    });
  };

  return (
    <View style={styles.Login}>
      <Text style={[styles.text]}>
        Bienvenido a{" "}
        <Text style={[stylesGlobal.text_bold]}>
          prescripciones odontológicas{" "}
        </Text>
        <Text style={[stylesGlobal.text_bold, stylesGlobal.color_colgate]}>
          Colgate
        </Text>
        , ingrese su número de cédula.
      </Text>

      <FormsInputs
        control={control}
        name={"password"}
        label={"Cédula de ciudadania"}
        type={"numeric"}
        placeholder={"C.C.:"}
        rules={{ required: "Este campo es obligatorio" }}
      />

      <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    paddingHorizontal: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 13,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default Login;
