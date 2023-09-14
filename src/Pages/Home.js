import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { Conexion } from "../config";
import { AZUL, GET } from "../Constants/constants";
import ItemPrescripcion from "../Components/ItemPrescripcion";
import { useNavigation } from "@react-navigation/native";
import { ROUTE } from "../Constants/RoutersLinks";
import Buttons from "../Components/Buttons";
import stylesGlobal from "../css/stylesGlobal";
import Title from "../Components/Title";
import Loading from "../Components/Loading";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [Prescripciones, setPrescripciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const getData = () => {
    setRefresh(true);
    Conexion({
      method: GET,
      url: "/lista",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setPrescripciones(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setRefresh(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getData()}
        />
      }
      style={[styles.Home]}>
      <View style={stylesGlobal.container}>
        {/* {loading && <Loading />} */}
        <View>
          <Title color={AZUL}>Mis Prescripciones</Title>
        </View>

        {Prescripciones.length > 0 &&
          Prescripciones.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(ROUTE.PAPER_PRESCRIPCION, {
                  id: data.id,
                });
              }}
            >
              <ItemPrescripcion data={data} />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Home: {},
});

export default Home;
