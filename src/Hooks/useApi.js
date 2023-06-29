import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { urlApi } from "../Constants/RoutersLinks";

export const useApi = () => {

   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(undefined);

   const ConexionApi = axios.create({
      baseURL: urlApi,
      headers: {
         authorization: `Bearer ${AsyncStorage.getItem('token')}`
      }
   })

   const api_handleSubmit = async (form) => {

      const auth = get_Auth(form);

      setLoading(true);
      const datos = await new Promise((resolve) => {
         ConexionApi({
            method: form.method,
            url: form.url,
            params: form.params,
            data: form,
            auth: auth
         })
            .then((response) => {
               setResponseApi(response);
               resolve(response);
            })
            .catch((error) => {
               resolve(error.response.data);
            })
            .finally(() => {
               setLoading(false);
            })
      });

      return (datos);
   };

   const get_Auth = (form) => {

      if (form.auth) {
         return {
            username: form.auth.correo,
            password: form.auth.password
         }
      } else {
         return null
      }
   }

   return {
      loading,
      responseApi,
      api_handleSubmit
   }
}