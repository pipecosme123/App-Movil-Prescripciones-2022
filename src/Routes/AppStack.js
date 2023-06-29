import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// PÁGINAS \\
import Prescripciones from "../Pages/Prescripciones";
import DownloadPdf from "../Components/DownloadPdf";
import CargarImagenes from "../Pages/CargarImagenes";
import Home from "../Pages/Home";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import stylesGlobal from "../css/stylesGlobal";
import { ROUTE } from "../Constants/RoutersLinks";
import PaperPrescripcion from "../Pages/PaperPrescripcion";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useNavigation } from "react-router-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NavigationPres = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName={ROUTE.PRESCRIPCIONES}>
      <Stack.Screen
        name={ROUTE.PRESCRIPCIONES}
        component={Prescripciones}
        options={{
          headerLeft: (props) => (
            <TouchableOpacity
              {...props}
              style={stylesGlobal.btnBack}
              onPress={() => {
                navigation.navigate(ROUTE.HOME);
              }}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: "Generar Prescripción",
          headerStyle: {
            backgroundColor: "#D2010D",
          },
          headerTitleStyle: {
            color: "#FFF",
          },
        }}
      />
      <Stack.Screen
        name={ROUTE.DOWNLOAD_PDF}
        component={DownloadPdf}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const NavigationHome = ({ navigation }) => {
  const {
    data: { nombres },
  } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE.HOME}
        component={Home}
        options={{
          headerTitle: `Hola, ${capitalizarPrimerasLetras(nombres)}`,
          headerStyle: {
            backgroundColor: "#009CA6",
          },
          headerTitleStyle: {
            color: "#FFF",
          },
        }}
      />
      <Stack.Screen
        name={ROUTE.PAPER_PRESCRIPCION}
        component={PaperPrescripcion}
        options={{
          headerTitle: "Prescripción",
          headerStyle: {
            backgroundColor: "#009CA6",
          },
          headerTitleStyle: {
            color: "#FFF",
          },
          headerLeft: (props) => (
            <TouchableOpacity
              {...props}
              style={stylesGlobal.btnBack}
              onPress={() => {
                navigation.navigate(ROUTE.HOME);
              }}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  if (routeName === ROUTE.PAPER_PRESCRIPCION) {
    return "none";
  }
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingVertical: 10,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          // borderTopLeftRadius: 30,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
        },
        tabBarLabelStyle: {
          paddingBottom: 20,
          fontSize: 13,
          fontWeight: "700",
        },
        tabBarActiveTintColor: "#009CA6",
      }}
    >
      <Tab.Screen
        name={ROUTE.CONTENT_HOME}
        component={NavigationHome}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            height: 80,
          },
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerShown: false,
        })}
      />

      <Tab.Screen
        name={ROUTE.CONTENT_PRESCRIPCIONES}
        component={NavigationPres}
        options={{
          tabBarButton: ({ children, onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{ height: 100, alignItems: "center" }}
            >
              <View>{children}</View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={style.btn_plus}>
              <Entypo name="plus" size={40} color="#ffffff" />
            </View>
          ),
          tabBarLabel: "Prescripción",
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "800",
          },
          tabBarStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ROUTE.CARGARIMAGENES}
        component={CargarImagenes}
        options={{
          tabBarLabel: "Vademecum",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: "#4CBAC1",
    height: 200,
  },
  btn_plus: {
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    // position: "absolute",
    // bottom: 5,
    // marginBottom: 10,
    backgroundColor: "#d2010d",
  },
});

export default AppStack;
