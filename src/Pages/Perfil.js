import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import stylesGlobal from "../css/stylesGlobal";

import { Entypo } from "@expo/vector-icons";
import Buttons from "../Components/Buttons";
import { AuthContext } from "../Context/AuthContext";
import { urlImages } from "../functions/urlImages";
import Title from "../Components/Title";
import { AZUL, GET } from "../Constants/constants";
import InputText from "../Components/InputText";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import { ROUTE } from "../Constants/RoutersLinks";
import { Conexion } from "../config";
import Loading from "../Components/Loading";

const Perfil = ({ navigation }) => {
  const { token, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { cedula, nombres, apellidos, telefono, firma, sello } = data;

  useEffect(() => {
    setLoading(true);
    Conexion({
      method: GET,
      url: "/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        reject(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView>
      {loading && <Loading />}
      {Object.keys(data).length > 0 && (
        <View style={[stylesGlobal.container, styles.Perfil]}>
          <View>
            <View>
              <Title color={AZUL}>Información de cuenta</Title>
              <InputText
                title={"Cedula"}
                data={cedula}
              />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <InputText
                  style={{ width: '50%' }}
                  title={"Nombres"}
                  data={capitalizarPrimerasLetras(nombres)}
                />
                <InputText
                  style={{ width: '50%' }}
                  title={"Apellidos"}
                  data={capitalizarPrimerasLetras(apellidos)}
                />
              </View>
              <InputText
                title={"Telefono"}
                data={telefono}
              />
            </View>
            <View>
              <View>
                <Text>Firma</Text>
                {firma ? (
                  <Image source={{ uri: urlImages(firma) }} style={styles.imagen} />
                ) : (
                  <View>
                    <Entypo name="camera" size={40} color="#727272" />
                    <Text>Sin imagen de la firma del odontólogo</Text>
                  </View>
                )}
              </View>
              <View>
                <Text>Sello</Text>
                {sello ? (
                  <Image source={{ uri: urlImages(sello) }} style={styles.imagen} />
                ) : (
                  <View>
                    <Entypo name="camera" size={40} color="#727272" />
                    <Text>Sin imagen del sello del odontólogo</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View>
            <Buttons color={AZUL} onPress={() => navigation.navigate(ROUTE.EDITAR_PERFIL, { data })}>Editar Información</Buttons>
            <Buttons outline={true} onPress={() => logout()}>Cerrar sesión</Buttons>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Perfil: {
    justifyContent: 'space-between'
  },
  seccionImagen: {
    width: "100%",
    height: 204,
    marginTop: 5,
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#727272",
    borderStyle: "dashed",
  },
  imagen: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default Perfil;
{/* <TouchableOpacity
  style={styles.seccionImagen}
  onPress={() => pickImage("sello")}
>
  {sello ? (
    <Image source={{ uri: urlImages(sello) }} style={styles.imagen} />
  ) : (
    <View>
      <Entypo name="camera" size={40} color="#727272" />
      <Text>Seleccionar la imagen del sello del odontólogo</Text>
    </View>
  )} */}