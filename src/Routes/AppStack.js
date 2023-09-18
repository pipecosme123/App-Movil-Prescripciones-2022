import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// PÁGINAS \\
import Prescripciones from "../Pages/Prescripciones";
import DownloadPdf from "../Components/DownloadPdf";
import Home from "../Pages/Home";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { capitalizarPrimerasLetras } from "../functions/capitalizarPrimerasLetras";
import stylesGlobal from "../css/stylesGlobal";
import { ROUTE } from "../Constants/RoutersLinks";
import PaperPrescripcion from "../Pages/PaperPrescripcion";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Perfil from "../Pages/Perfil";
import EditarPerfil from "../Pages/EditarPerfil";
import Vademecum from "../Pages/Vademecum";
import { BLANCO, NARANJA } from "../Constants/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabHome = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 90,
          paddingBottom: 20,
          fontWeight: "700",
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 600,
          margin: 0
        },
      })}
    >

      <Tab.Screen
        name={ROUTE.CONTENT_HOME}
        component={NavigationHome}
        options={({ route }) => ({
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#009CA6",
          headerShown: false,
        })}
      />

      <Tab.Screen
        name={ROUTE.CONTENT_PRESCRIPCIONES}
        component={StackPrescripciones}
        options={({ route }) => ({
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }) => (
            <View style={style.btn_plus}>
              <Entypo name="plus" size={40} color="#ffffff" />
            </View>
          ),
          tabBarLabel: "Prescripción",
          tabBarLabelStyle: {
            color: "#D2010D",
            fontSize: 15,
            fontWeight: 600
          },
          headerShown: false,
        })}
      />

      <Tab.Screen
        name={ROUTE.VADEMECUM}
        component={Vademecum}
        options={({ route }) => ({
          tabBarLabel: "Vademécum",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: NARANJA,
          },
          headerTitleStyle: {
            color: "#FFF",
          },
          tabBarActiveTintColor: NARANJA,
        })}
      />

    </Tab.Navigator>
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
          headerRight: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                width: 40,
                height: 40,
                padding: 5,
                backgroundColor: "#F3F3F3",
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                navigation.navigate(ROUTE.PERFIL);
              }}
            >
              <AntDesign name="user" size={24} color="#A0A0A0" />
            </TouchableOpacity>
          ),
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
      <Stack.Screen
        name={ROUTE.PERFIL}
        component={Perfil}
        options={{
          headerTitle: "Perfil",
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
      <Stack.Screen
        name={ROUTE.EDITAR_PERFIL}
        component={EditarPerfil}
        options={{
          headerTitle: "Editar Perfil",
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
                navigation.navigate(ROUTE.PERFIL);
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

const StackPrescripciones = ({ navigation }) => {
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

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"ROUTE.CONTENT_HOME"} component={TabHome} />
      <Stack.Screen
        name={ROUTE.CONTENT_PRESCRIPCIONES}
        component={StackPrescripciones}
      />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: "#4CBAC1",
    height: 200,
  },
  btn_plus: {
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    position: "absolute",
    bottom: 5,
    backgroundColor: "#d2010d",
  },
  tabBarStyle: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderTopWidth: 2,
    borderTopColor: "#000000",
    // borderTopEndRadius: 30,
    // borderTopStartRadius: 30,
  },
});

export default AppStack;

/*

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

*/
