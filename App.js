import './config/base64Polyfill.js';
import * as React from "react";
import MainNavigator from "./src/Routes/MainNavigator";
import { AuthProvider } from "./src/Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
