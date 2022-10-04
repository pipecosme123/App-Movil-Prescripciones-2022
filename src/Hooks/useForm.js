import { useState } from "react";
import axios from "axios";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { urlApi } from "../Constants/RoutersLinks";

export const useForm = (initialForm, validationForm) => {

   const [form, setForm] = useState(initialForm);
   const [error, setError] = useState({ status: false });
   const [showError, setShowError] = useState(false);
   const [loading, setLoading] = useState(false);
   const [responseApi, setResponseApi] = useState(null);

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

   const handleSubmit = (e) => {
      // handleBlur(e);
      // setShowError(true);
      // // console.log(form);
      downloadPrescripcion()
      // if (Object.keys(error).length === 0) {

      //    setLoading(true);

      //    axios.post(`${urlApi}/pdf`, form)
      //       .then((response) => {
      //          setLoading(false);
      //          // setResponseApi(true);
      //          // resetForm();

      //          console.log(response.data)
      //       })
      //       .catch(function (error) {
      //          setLoading(false);
      //          setResponseApi(false);
      //          console.log(false)
      //       })
      // } else {
      //    console.log('erorr', Object.keys(error).length, error.status)
      // }
   };

   const resetForm = () => {
      document.getElementById("formAsistencia").reset();
      setForm(initialForm);
      setError({ status: false })
      setShowErrors(false)
   }

   const downloadPrescripcion = async () => {

      const uri = "http://techslides.com/demos/sample-videos/small.mp4"
      let fileUri = FileSystem.documentDirectory + "small.mp4";
      FileSystem.downloadAsync(uri, fileUri)
         .then(({ uri }) => {
            saveFile(uri);
         })
         .catch(error => {
            console.error(error);
         })

   }

   const saveFile = async (fileUri) => {
      const perm = await MediaLibrary.requestPermissionsAsync();
      
      if (perm.status != 'granted') {
         return;
      }

      try {
         const asset = await MediaLibrary.createAssetAsync(fileUri);
         const album = await MediaLibrary.getAlbumAsync('Download');
         if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
         } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
         }
      } catch (e) {
         handleError(e);
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