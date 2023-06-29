import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Conexion } from "../config";
import { AZUL, GET, baseURL } from "../Constants/constants";
import { AuthContext } from "../Context/AuthContext";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import InputText from "../Components/InputText";
import Title from "../Components/Title";
import Buttons from "../Components/Buttons";
import ItemProductos from "../Components/ItemProductos";
import stylesGlobal from "../css/stylesGlobal";
import Loading from "../Components/Loading";

const PaperPrescripcion = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const { prescripcion, productos } = data;

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    isLoading(true);
    Conexion({
      method: GET,
      url: `/pres/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        isLoading(false);
      });
  }, []);

  const isLoading = (state) => {
    navigation.setOptions({
      headerShown: !state,
    });
    setLoading(state);
  };

  return (
    <ScrollView style={{}}>
      <View style={[stylesGlobal.container]}>
        {loading && <Loading />}
        {Object.keys(data).length !== 0 && (
          <View>
            <View>
              <Title color={AZUL}>Paciente</Title>
              <InputText title={"Cédula"} data={prescripcion.cedulas} />
              <InputText
                title={"Nombres"}
                data={capitalizarPrimerasLetras(prescripcion.nombres)}
              />
              <InputText
                title={"Apellidos"}
                data={capitalizarPrimerasLetras(prescripcion.apellidos)}
              />
              <InputText
                title={"Recomendaciones"}
                data={capitalizarPrimerasLetras(prescripcion.recomendaciones)}
              />
            </View>
            <View>
              <Title color={AZUL}>Productos</Title>
              {productos.map(({ nombres, imagen }, index) => (
                <ItemProductos
                  key={index}
                  name={nombres}
                  url={`${baseURL}/img?key=${imagen}`}
                />
              ))}
            </View>
            <View>
              <Buttons color={AZUL}>Generar Prescripción</Buttons>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  PaperPrescripcion: {
    flex: 1,
    alignContent: "center",
  },
});

export default PaperPrescripcion;
