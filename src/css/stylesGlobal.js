import { StyleSheet } from "react-native";

const stylesGlobal = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 16,
  },
  tabBottom: {
    paddingBottom: 80,
  },
  labelInput: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
    marginLeft: 5,
  },
  btn: {
    width: "100%",
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn_outline_red: {
    borderColor: "#d2010d",
    backgroundColor: "#ffffff",
  },
  btn_outline_blue: {
    borderColor: "#009CA6",
    backgroundColor: "#ffffff",
  },
  btn_red: {
    borderColor: "#d2010d",
    backgroundColor: "#d2010d",
  },
  btn_azul: {
    borderColor: "#009CA6",
    backgroundColor: "#009CA6",
  },
  text_bold: {
    fontWeight: "600",
  },
  // COLORES
  color_colgate: {
    color: "#d2010d",
  },
  color_blanco: {
    color: "#ffffff",
  },
  color_azul: {
    color: "#009CA6",
  },
  color_oscuro: {
    color: "#595655",
  },
  btnBack: {
    marginRight: 20,
  },
  // color_blanco: {
  //    color: "#ffffff"
  // },
});

export default stylesGlobal;
