import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { AS_DATA, AS_TOKEN, GET } from "../Constants/constants";
import { Conexion } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  const login = async ({ username = "", password }) => {
    setIsLoading(true);

    return await new Promise((resolve, reject) => {
      Conexion({
        method: GET,
        url: "/login",
        auth: {
          username,
          password,
        },
      })
        .then((res) => {
          const { token, data } = res.data;
          setToken(token);
          setData(data);
          AsyncStorage.setItem(AS_TOKEN, token);
          AsyncStorage.setItem(AS_DATA, JSON.stringify(data));
          resolve("Iniciando sesión")
        })
        .catch((err) => {
          reject(err.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })
  };

  const logout = () => {
    setIsLoading(true);
    setToken(null);
    setData(null);
    AsyncStorage.removeItem(AS_DATA);
    AsyncStorage.removeItem(AS_TOKEN);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem(AS_TOKEN);
      let data = await AsyncStorage.getItem(AS_DATA);
      data = JSON.parse(data);

      setToken(token);
      setData(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, isLoading, token, data }}>
      {children}
    </AuthContext.Provider>
  );
};
