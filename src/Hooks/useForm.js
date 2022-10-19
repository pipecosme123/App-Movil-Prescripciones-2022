import { useState } from "react";
import axios from "axios";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import { urlApi } from "../Constants/RoutersLinks";
import { Share } from "react-native";
import { shareAsync } from "expo-sharing";
import { useNavigation } from "@react-navigation/native";

export const useForm = (initialForm, validationForm) => {

   const navigation = useNavigation();

   const [form, setForm] = useState(initialForm);
   const [error, setError] = useState({ status: false });
   const [showError, setShowError] = useState(false);
   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState({ status: null });

   const handleChange = (e) => {
      const name = e.name;
      const value = e.value;
      setForm({
         ...form,
         [name]: value
      });
   };

   const handleProductos = (seleccion) => {
      setForm({
         ...form,
         productos: seleccion
      });
   }

   const handleBlur = (e) => {
      handleChange(e);
      setError(validationForm(form));
   }

   const handleSubmit = async (e) => {
      handleBlur(e);
      setShowError(true);

      if (Object.keys(error).length === 0) {

         setLoading(true);

         axios.post(`${urlApi}/pdf`, form)
            .then((response) => {
               setLoading(false);
               redirectResponse(response.data);
            })
            .catch(function (error) {
               setLoading(false);
               setResponseApi(false);
               console.log(error)
            })
      } else {
         console.log('erorr', Object.keys(error).length, error.status)
      }
   };

   const resetForm = () => {
      document.getElementById("formAsistencia").reset();
      setForm(initialForm);
      setError({ status: false })
      setShowErrors(false)
   }

   const downloadFile = (urlFile) => {

      FileSystem.downloadAsync(
         `${urlApi}/files/${urlFile}`,
         FileSystem.documentDirectory + urlFile
      )
         .then(({ uri }) => {
            console.log('Finished downloading to ', uri);
         })
         .catch(error => {
            console.error(error);
         });
   }

   const redirectResponse = (data) => {

      if(data !== 'Error'){
         downloadFile(data);
         navigation.navigate('ResultadoApi', {
            status: true,
            uri_pdf: data
         })
      }else{
         navigation.navigate('ResultadoApi', {
            status: false
         })
      }
   }

   return {
      form,
      error,
      showError,
      loading,
      responseApi,
      handleChange,
      handleProductos,
      handleBlur,
      handleSubmit
   }
}