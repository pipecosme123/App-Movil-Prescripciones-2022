import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../Context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const MainNavigator = () => {
  const { isLoading, token } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignltems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
