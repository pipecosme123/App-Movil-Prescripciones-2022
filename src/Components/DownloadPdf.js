import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import { Animations } from "../Constants/Animations";
import { shareAsync } from "expo-sharing";
import Buttons from "./Buttons";
import { VERDE } from "../Constants/constants";
import { ROUTE } from "../Constants/RoutersLinks";

const DownloadPdf = ({ navigation }) => {
  const route = useRoute();

  const { data } = route.params;
  const [locationPdf, setLocationPdf] = useState("");

  const saveFileToDevice = async (pdfBlob) => {
    const fileUri = FileSystem.documentDirectory + "archivo.pdf";

    try {
      await FileSystem.writeAsStringAsync(fileUri, pdfBlob, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLocationPdf(fileUri);
    } catch (error) {
      console.log("Error al guardar el archivo:", error);
    }
  };

  const sharePrescripcion = async () => {
    await shareAsync(locationPdf, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  };

  useEffect(() => {
    saveFileToDevice(data);
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.DownloadPdf]}>
      <LottieView
        style={styles.animation_check}
        source={Animations.check}
        autoPlay
        loop={false}
      />

      <Text style={styles.textDownloadPdf}>
        Prescirpción generanda correctamente
      </Text>

      <View style={styles.bottones}>
        <Buttons
          outline={true}
          color={VERDE}
          onPress={() => navigation.navigate(ROUTE.HOME)}
        >
          Regresar
        </Buttons>

        <Buttons color={VERDE} onPress={() => sharePrescripcion()}>
          Enviar al paciente
        </Buttons>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DownloadPdf: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  animation_check: {
    width: 150,
  },
  animation_wrong: {
    width: 80,
    marginBottom: 10,
  },
  textDownloadPdf: {
    position: "relative",
    bottom: 20,
    fontSize: 15,
    textAlign: "center",
  },
  textDownloadPdf_wrong: {
    fontSize: 15,
    textAlign: "center",
  },
  bottones: {
    width: "90%",
    alignItems: "center",
  },
  buttonShare: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#70cd5f",
    borderRadius: 10,
  },
  buttonReset: {
    width: "90%",
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#70cd5f",
  },
  buttonReset_wrong: {
    width: "90%",
    marginTop: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d2010d",
  },
  textStyle_Share: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle_Reset: {
    fontSize: 15,
    color: "#70cd5f",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle_wrong_Reset: {
    fontSize: 15,
    color: "#d2010d",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DownloadPdf;
