import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// PÁGINAS \\
import Login from "../Pages/Login";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
