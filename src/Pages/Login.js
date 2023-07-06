import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormsInputs from "../Components/FormsInputs";
import stylesGlobal from "../css/stylesGlobal";
import { AuthContext } from "../Context/AuthContext";
import Buttons from "../Components/Buttons";
import LogoPrescripciones from "../Images/SvgComponent";
import SvgComponent from "../Images/SvgComponent";
import Svg2Component from "../Images/Svg2Component";
import { AZUL, BLANCO, GRIS_CLARO } from "../Constants/constants";

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
      <View style={styles.Sonrisa}></View>
      <View style={styles.Container}>
        <View style={styles.Logo}>
          <SvgComponent />
        </View>

        <View style={styles.InicioSesion}>
          <View>
            <Text style={[styles.text]}>
              Bienvenido a{" "}
              <Text style={[stylesGlobal.text_bold]}>
                Las Prescripciones Odontológicas{" "}
              </Text>
              <Text style={[stylesGlobal.text_bold, stylesGlobal.color_colgate]}>
                Colgate &#174;
              </Text>
              . Para ingresar, digíte su número de cédula a continuación.
            </Text>

            <FormsInputs
              control={control}
              name={"password"}
              label={"Cédula de ciudadania"}
              type={"numeric"}
              placeholder={"C.C.:"}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </View>

          <Buttons onPress={handleSubmit(onSubmit)}>Iniciar Sesión</Buttons>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AZUL
  },
  Sonrisa: {
    width: "150%",
    height: "70%",
    backgroundColor: GRIS_CLARO,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300
  },
  Container: {
    width: "80%",
    height: "100%",
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: "#000000"
  },
  Logo: {
    width: '80%',
    height: "20%",
    justifyContent: 'flex-end',
    alignItems: 'center'
    // backgroundColor: BLANCO
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  InicioSesion: {
    width: "100%",
    height: "50%",
    paddingHorizontal: 15,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: 'space-evenly'
  }
});

export default Login;
