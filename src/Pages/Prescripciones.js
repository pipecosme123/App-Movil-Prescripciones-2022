import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormsInputs from "../Components/FormsInputs";
import TapsProductos from "../Components/TapsProductos";
import ItemListPres from "../Components/ItemListPres";
import stylesGlobal from "../css/stylesGlobal";
import { AuthContext } from "../Context/AuthContext";
import { Conexion } from "../config";
import { GET, POST, ROJO } from "../Constants/constants";
import Title from "../Components/Title";
import Loading from "../Components/Loading";
import { ROUTE } from "../Constants/RoutersLinks";
import Buttons from "../Components/Buttons";

const defaultValues = {
  paciente: {
    cedula: "",
    nombre: "",
    apellido: "",
  },
  prescripcion: {
    productos: [],
    recomendaciones: "",
  },
};

const Prescripciones = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const { token } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    isLoading(true);
    Conexion({
      method: POST,
      url: "/prescripcion/add",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then(({ data }) => {
        navigation.navigate(ROUTE.DOWNLOAD_PDF, { data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isLoading(false);
      });
  };

  // -------------- PROCESO -------------- \\
  const cargarProductos = () => {
    Conexion({
      method: GET,
      url: "/products",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        AsyncStorage.setItem("@productos", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onHandleProductos = (productos) => {
    const ids = [];

    productos.map(({ id }) => {
      ids.push(id);
    });

    setValue("prescripcion.productos", ids);
    setProductosSeleccionados(productos);
    setModalVisible(false);
  };

  const isLoading = (state) => {
    navigation.setOptions({
      headerShown: !state,
    });
    setLoading(state);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <ScrollView style={styles.Prescripciones}>
      {!loading ? (
        <View style={[stylesGlobal.container, { paddingBottom: 20 }]}>
          <Title color={ROJO}>Paciente</Title>
          <View style={[styles.seccion]}>
            <FormsInputs
              control={control}
              // rules={{
              //   required: "Este campo es requerido",
              // }}
              name={"paciente.cedula"}
              label={"Cédula de ciudadanía"}
              type={"numeric"}
              nameImput={"cedula"}
            />
          </View>
          <View style={[styles.seccion]}>
            <FormsInputs
              control={control}
              // rules={{
              //   required: "Este campo es requerido",
              // }}
              name={"paciente.nombre"}
              label={"Nombres"}
              type={"default"}
              nameImput={"nombre_paciente"}
            />
          </View>
          <View style={[styles.seccion]}>
            <FormsInputs
              control={control}
              // rules={{
              //   required: "Este campo es requerido",
              // }}
              name={"paciente.apellido"}
              label={"Apellidos"}
              type={"default"}
              nameImput={"apellido_paciente"}
            />
          </View>

          {/* ////////// MODAL \\\\\\\\\\ */}
          <Title color={ROJO}>Productos</Title>
          <View style={[styles.seccion]}>
            <Buttons outline={true} onPress={() => setModalVisible(true)}>
              Seleccionar Productos
            </Buttons>

            <View style={stylesGlobal.containerSuperior}>
              <Modal
                animation
                Type={"slide"}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TapsProductos handleProductos={onHandleProductos} />
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.productosSeleccionados}>
              <View>
                {productosSeleccionados.length !== 0 ? (
                  productosSeleccionados.map(({ imagen, nombres }, index) => (
                    <ItemListPres
                      key={index}
                      imagen={imagen}
                      nombres={nombres}
                    />
                  ))
                ) : (
                  <Text>{"Debes seleccionar como mínimo un producto"}</Text>
                )}
              </View>
            </View>
          </View>

          <Title color={ROJO}>Recomendaciones</Title>

          <View style={[styles.seccion]}>
            <FormsInputs
              control={control}
              // rules={{
              //    required: "Este campo es requerido"
              // }}
              name={"prescripcion.recomendaciones"}
              label={"Recomendaciones Adicionales"}
              type={"default"}
              nameImput={"recomendaciones"}
              multiline={true}
            />
          </View>

          <TouchableOpacity
            style={[stylesGlobal.btn, stylesGlobal.btn_red]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={[stylesGlobal.btn_text, stylesGlobal.color_blanco]}>
              Generar Prescripción
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loading simple={false} text={"Generando prescripción..."} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tituloPagina: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#d2010d",
  },
  nombre_pacienteDoctor: {
    fontStyle: "italic",
    marginBottom: 10,
    color: "#595655",
  },
  fecha: {
    paddingHorizontal: 20,
  },
  seccion: {
    marginVertical: 2.5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  sessionError: {
    borderWidth: 1.5,
    borderColor: "#d2010d",
  },
  containerSuperior: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1,1,1,.5)",
    margin: 0,
  },
  modalView: {
    width: "95%",
    height: "95%",
    margin: 20,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    height: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#d2010d",
  },
  buttonClose: {
    backgroundColor: "#d2010d",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  productosSeleccionados: {
    width: "100%",
  },
  textError: {
    marginLeft: 15,
    color: "#d2010d",
  },
});

export default Prescripciones;
