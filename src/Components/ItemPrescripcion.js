import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import stylesGlobal from "../css/stylesGlobal";

const ItemPrescripcion = ({ data }) => {
  const { cedulas, nombres, apellidos, create_at } = data;

  return (
    <View style={styles.item}>
      <View style={styles.iconView}>
        <Entypo name="text-document" size={24} color={"#FF6905"} />
      </View>
      <View style={styles.dataView}>
        <Text style={styles.title}>
          {capitalizarPrimerasLetras(`${nombres} ${apellidos}`)}
        </Text>
        <Text style={styles.cedulas}>C.C.: {cedulas}</Text>
        <Text style={styles.fecha}>{`${create_at}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    marginRight: 10,
  },
  dataView: {
    width: '90%'
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    ...stylesGlobal.color_azul,
  },
  cedulas: {
    fontSize: 10,
  },
  fecha: {
    fontSize: 10,
    textAlign: "right",
    color: '#a5a5a5'
  },
});

export default ItemPrescripcion;
