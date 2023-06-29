import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemList from "./ItemList";
import stylesGlobal from "../css/stylesGlobal";
import { AZUL, TODOS } from "../Constants/constants";
import Buttons from "./Buttons";

const TapsProductos = ({ handleProductos }) => {
  const numColumns = 2;

  const [categoria, setCategoria] = useState(TODOS);
  const [listTab, setListTab] = useState([]);

  const [productosStorage, setProductosStorage] = useState([]);

  const [selected, setSelected] = useState([]);

  const setCategoriaFilter = (categoria) => {
    if (categoria !== TODOS) {
      setSelected([
        ...productosStorage.filter((e) => e.categorias === categoria),
      ]);
    } else {
      setSelected(productosStorage);
    }
    setCategoria(categoria);
  };

  const hadleOnPress = (item) => {
    const newItemSelected = selected.map((val) => {
      if (val.id === item.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        return val;
      }
    });

    const newItemStorage = productosStorage.map((val) => {
      if (val.id === item.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        return val;
      }
    });

    subirDatos(newItemStorage);
    setProductosStorage(newItemStorage);
    setSelected(newItemSelected);
  };

  const subirDatos = async (data) => {
    await AsyncStorage.setItem("@productos", JSON.stringify(data));
  };

  const sendProductos = () => {
    let select = [];
    productosStorage.map((val) => {
      if (val.selected === true) {
        select.push(val);
      }
    });
    handleProductos(select);
  };

  const extraerCategorias = (arr) => {
    let categorias = [TODOS];

    arr.forEach(objeto => {
      if (!categorias.includes(objeto.categorias)) {
        categorias.push(objeto.categorias);
      }
    });

    setListTab(categorias);
  };

  const traerDatos = async () => {
    let valor = await AsyncStorage.getItem("@productos");
    valor = JSON.parse(valor);
    setProductosStorage(valor);
    setSelected(valor);
    extraerCategorias(valor);
    // setTexto(JSON.parse(valor))
    // Alert.alert(value)
  };

  useEffect(() => {
    traerDatos();
  }, []);

  return (
    <View>
      <Text style={styles.titulo}>Productos</Text>
      <Text style={styles.subtitulo}>
        Puedes seleccionar uno o varios productos
      </Text>

      <View style={styles.TapsProductos}>
        <View style={styles.listTab}>
          <FlatList
            data={listTab}
            keyExtractor={(key, index) => {
              return index;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.btnTabs,
                  categoria === item && styles.btnTabsActive,
                ]}
                onPress={() => setCategoriaFilter(item)}
              >
                <Text
                  style={[
                    styles.txtTabs,
                    categoria === item && styles.btnTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.listaProductos}>
          <FlatList
            numColumns={numColumns}
            data={selected}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={[styles.ItemList, item.selected && styles.isSelected]}
                  onPress={() => hadleOnPress(item)}
                >
                  <ItemList imagen={item.imagen} nombres={item.nombres} />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.send}>
          <Buttons outline={true} color={AZUL} onPress={() => sendProductos()}>Guardar</Buttons>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    textAlign: "center",
    color: "#d2010d",
    fontWeight: "800",
  },
  subtitulo: {
    // fontSize: 10,
    fontStyle: "italic",
    marginBottom: 10,
    color: "#595655",
  },
  TapsProductos: {
    flex: 1,
    paddingHorizontal: 2,
    marginTop: 2,
    // justifyContent: 'center'
  },
  listTab: {
    flexDirection: "row",
    alignSelf: "center",
    // marginBottom: 10
  },
  btnTabs: {
    width: Dimensions.get("window").width / 2,
    padding: 6,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: "transparent",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#D6D6D6",
  },
  txtTabs: {
    fontSize: 16,
  },
  btnTabsActive: {
    backgroundColor: "#fff",
  },
  btnTextActive: {
    color: "#d2010d",
  },
  listaProductos: {
    height: "85%",
  },
  ItemList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 0.9,
    borderColor: "white",
    margin: 1,
  },
  isSelected: {
    backgroundColor: "#D9F0F2",
    borderWidth: 0.9,
    borderColor: "#009CA6",
  },
  send: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonSend: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#009CA6",
  },
  textButtonSend: {
    color: "#009CA6",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
    // backgroundColor: '#009CA6'
  },
});

export default TapsProductos;
