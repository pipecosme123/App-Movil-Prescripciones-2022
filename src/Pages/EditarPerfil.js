import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import stylesGlobal from "../css/stylesGlobal";

import { Entypo } from "@expo/vector-icons";
import Buttons from "../Components/Buttons";
import { AuthContext } from "../Context/AuthContext";
import { urlImages } from "../functions/urlImages";
import Title from "../Components/Title";
import { AS_DATA, AS_TOKEN, AZUL, GET, PUT } from "../Constants/constants";
import InputText from "../Components/InputText";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import { ROUTE } from "../Constants/RoutersLinks";
import FormsInputs from "../Components/FormsInputs";
import { useForm } from "react-hook-form";
import { Conexion } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Components/Loading";
import Alerts from "../Components/Alerts";

const EditarPerfil = ({ route, navigation }) => {

  const { cedula, nombres, apellidos, telefono } = route.params.data;
  const { isLoggedIn, token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: '',
  });

  // console.log({ cedula, nombres, apellidos, telefono });
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      nombres: capitalizarPrimerasLetras(nombres),
      apellidos: capitalizarPrimerasLetras(apellidos),
      telefono,
      img: {
        firma: null,
        sello: null,
      }
    }
  });

  const imagenes = watch("img");

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const date = new Date();
      const uri = result.assets[0].uri;
      const ext = uri.split('.')[uri.split('.').length - 1];

      setValue(`img.${type}`, {
        name: `${date.getTime()}.${ext}`,
        uri,
        type: `image/${ext}`
      })
    }
  };

  const onClose = () => {
    setAlert({
      ...alert,
      show: false
    })
    if (alert.type === true) {
      isLoggedIn();
    }
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('firma', data.img.firma);
    formData.append('sello', data.img.sello);
    delete data.img;
    formData.append('data', JSON.stringify(data));

    setLoading(true);
    Conexion({
      method: PUT,
      url: "/user",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    })
      .then((res) => {
        const { token, data } = res.data;

        console.log(data);

        AsyncStorage.setItem(AS_TOKEN, token);
        AsyncStorage.setItem(AS_DATA, JSON.stringify(data));

        setAlert({
          show: true,
          type: true,
          message: 'Los datos se han actualizado correctamente',
        })

      })
      .catch(({ response: { data } }) => {
        setAlert({
          show: true,
          type: true,
          message: data,
        });
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });

  }

  // {"apellidos": "cosme vásquez", "cedula": "1143997339", "codigo_col": "col01", "create_at": "2023-03-16T21:47:20.000Z", "firma": "firma/1688142161898.jpeg", "id": 1, "nombres": "daniel felipe", "rol": "kagencia", "sello": "sello/1688142161930.jpeg", "telefono": "3118289486"}

  // useEffect(() => {
  //   setLoading(true);
  //   Conexion({
  //     method: GET,
  //     url: "/user",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(({ data }) => {
  //       setData(data);
  //       // console.log(data);
  //     })
  //     .catch((err) => {
  //       reject(err.response.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <ScrollView>
      {!loading ?
        (
          <View style={[stylesGlobal.container, styles.EditarPerfil]}>
            <View>
              <View>
                <Title color={AZUL}>Información de cuenta</Title>
                <FormsInputs
                  control={control}
                  // rules={{
                  //   required: "Este campo es requerido",
                  // }}
                  name={"nombres"}
                  label={"Nombres"}
                  nameImput={"nombres"}
                />
                <FormsInputs
                  control={control}
                  // rules={{
                  //   required: "Este campo es requerido",
                  // }}
                  name={"apellidos"}
                  label={"Apellidos"}
                  nameImput={"apellidos"}
                />
                <FormsInputs
                  control={control}
                  // rules={{
                  //   required: "Este campo es requerido",
                  // }}
                  type="numeric"
                  name={"telefono"}
                  label={"Teléfono Celular"}
                  nameImput={"telefono"}
                />
              </View>
              <View>
                <View>
                  <Text>Firma</Text>
                  <TouchableOpacity
                    style={styles.seccionImagen}
                    onPress={() => pickImage("firma")}
                  >
                    {imagenes.firma ? (
                      <Image source={{ uri: imagenes.firma.uri }} style={styles.imagen} />
                    ) : (
                      <View style={styles.contentImage}>
                        <Entypo name="camera" size={40} color="#727272" />
                        <Text>Seleccionar la imagen de la firma del odontólogo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>Sello</Text>
                  <TouchableOpacity
                    style={styles.seccionImagen}
                    onPress={() => pickImage("sello")}
                  >
                    {imagenes.sello ? (
                      <Image source={{ uri: imagenes.sello.uri }} style={styles.imagen} />
                    ) : (
                      <View style={styles.contentImage}>
                        <Entypo name="camera" size={40} color="#727272" />
                        <Text>Seleccionar la imagen del sello del odontólogo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Buttons color={AZUL} onPress={handleSubmit(onSubmit)}>Editar Información</Buttons>
              {/* <Buttons outline={true} onPress={() => logout()}>Cerrar sesión</Buttons> */}
            </View>
          </View>
        )
        :
        <Loading />
      }
      <Alerts show={alert.show} onClose={onClose} type={alert.type} message={alert.message} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  EditarPerfil: {
    justifyContent: 'space-between'
  },
  seccionImagen: {
    width: "100%",
    height: 204,
    marginTop: 5,
    backgroundColor: "#bfbfbf",
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
  contentImage: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
  }
});

export default EditarPerfil;
{/* <TouchableOpacity
  style={styles.seccionImagen}
  onPress={() => pickImage("sello")}
>
  {imagenes.sello ? (
    <Image source={{ uri: urlImages(imagenes.sello) }} style={styles.imagen} />
  ) : (
    <View>
      <Entypo name="camera" size={40} color="#727272" />
      <Text>Seleccionar la imagen del sello del odontólogo</Text>
    </View>
  )} */}