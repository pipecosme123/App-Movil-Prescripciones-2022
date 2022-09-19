import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
// import { printToFileAsync } from 'expo-print';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

const PrintToPDFs = () => {

   const [qrCode, setQrCode] = useState();
   const [qrHTML, setQrHTML] = useState();
   const [visibleQR, setVisibleQR] = useState(false);

   const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      setVisibleQR(true);
      const { uri } = await Print.printToFileAsync({
         html: generarPDF(),
         base64: false
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      setVisibleQR(false);
   }

   const generarQR = () => {
      qrCode.toDataURL((data) => {
         const url = `data:image/png;base64,${data}`;
         setQrHTML(url);
      });
   }

   const generarPDF = () => {

      
      generarQR();


      let nombrePaciente = 'Daniel Felipe';
      let apellidoPaciente = 'Cosme';
      let cedulaPaciente = '11.254.254.210';
      let nombreDoctor = 'Daniel Felipe Cosme';
      let telefonoDoctor = '318 259 9197';

      let imagenP = qrHTML;
      console.log(qrHTML);
      // let imgQR = 
      // qrCode.toDataURL();
      // console.log(qrCode);

      const html = `
      <html>

<head>
   <meta charset="UTF-8">
   <meta name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>

<body>
   <h1 style="font-size: 25px; font-family: Helvetica Neue; font-weight: normal; text-align=center; color: #d2010d">
      Prescripción del producto</h1>
   <hr>
   <div>
      <div>
         <p>Fecha: 15 SEPTIEMBRE 2022</p>
      </div>
      <div>
         <h1>CÓDIGO QR</h1>
      </div>
      <div>
         <div>
            <p>NOMBRE: ${nombrePaciente} ${apellidoPaciente}</p>
            <p>CÉDULA: ${cedulaPaciente}</p>
         </div>
         <div>
            <p>DR(A).: ${nombreDoctor}</p>
            <p>TELEFONO: ${telefonoDoctor}</p>
         </div>
      </div>
      <div>
      <img src="data:image/png;base64,${qrCode}" style="width: 10vw;" />
         <img src="${qrHTML}" style="width: 10vw;" />
         <img src="${imagenP}" style="width: 10vw;" />
         <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
      </div>
      <div>
         <p>DESCRIPCIÓN</p>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
            atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
            eligendi?</p>
      </div>
      <div>
         <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
         <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
      </div>
      <div>
         <p>Encuentre el producto en: Drogas la Rebaja, Farmatodo, Droguerías Alemana, Cruz Verde, Farmacias Pasteur,
            Locatel</p>
      </div>
   </div>
</body>
</html>
      `;

      return html;
   }

   return (
      <View style={styles.container}>
         {/* <TextInput value={name} placeholder="Name" style={styles.textInput} onChangeText={(value) => setName(value)} /> */}
         <Button title="Generate PDF" onPress={printToFile} />
         {visibleQR &&
            <View style={styles.codigoQR}>

            </View>
         }
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   textInput: {
      alignSelf: "stretch",
      padding: 8,
      margin: 8
   },
   codigoQR: {

   }
});

export default PrintToPDFs;