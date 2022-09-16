import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const PrintToPDFs = () => {

   const [page, setPage] = useState('');

   const crearPDF = () => {
      setHTML('Daniel Felipe', 'Cosme', '11111111111', 'Daniel', '3112859786');
      setTimeout(() => {
         printToFile();
      }, 500);
   }

   const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({
         page
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
   }

   const setHTML = (nombrePaciente, apellidoPaciente, cedulaPaciente, nombreDoctor, telefonoDoctor) => {
      setPage(
         `
      <!DOCTYPE html>
      <html lang="en">
      
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
               <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
               <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
               <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 10vw;" />
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
      `
      )
      console.log('paso');
   };

   return (
      <View style={styles.PrintToPDFs}>
         <Button title='Print to PDF file' onPress={crearPDF} />
      </View>
   );
};

const styles = StyleSheet.create({
   PrintToPDFs: {

   }
});

export default PrintToPDFs;