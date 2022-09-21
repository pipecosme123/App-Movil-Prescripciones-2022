import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const sttlesPDF = `
*{
   color: #212121;
}

.titulo{
   font-size: 30px;
   font-family: Helvetica Neue;
   font-weight: 900;
   text-align: center;
   text-transform: uppercase;
   color: #d2010d;
}

.seccionQR{
   width: 100px;
   padding: 16px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border-radius: 8px;
   background: #d2010d;
   position: absolute;
   right: 110px;
   top: 110px;
}

.seccionQR h3{
   margin-top: 0px;
   margin-bottom: 3px;
   font-size: 15px;
   color: #fff;
   font-weight: 900;
}

.seccionQR img{
   width: 10vw;
   padding: 8px;
   border-radius: 8px;
   background: #fff;
}

.informacion {
   margin: 16px 0;
}

.item-info{
   display: flex;
   align-items: center;
   margin-bottom: 8px;
}

.item-info .item-titulo{
   width: 90px;
   font-weight: 900;
}

.item-info p{
   margin: 0;
   padding: 8px;
   background: #cccccc;
   border-radius: 8px;
   text-transform: uppercase;
}

.item-info p.infoVariable{
   margin-left: 8px;
   width: 300px;
}
`;

const qrPrueba = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAETCAYAAAAVqeK4AAAAAXNSR0IArs4c6QAAAARzQklUCAgI
CHwIZIgAAAVaSURBVHic7d1BbuRGEEXBbkP3v7K80AVcwEs4qxCxFgQ2qXmoxW/O9/P5/H448vs7
c8u+3+/I791gwz07uYaXn8WUf/7vCwDeICZAQkyAhJgACTEBEmICJMQESIgJkBATICEmQOLn5Ien
JtEb3Dafvm0avuEapvh38cfJBEiICZAQEyAhJkBCTICEmAAJMQESYgIkxARIiAmQOJrTn9gwn94w
c566Dy/f36k3zm/w8nNzMgESYgIkxARIiAmQEBMgISZAQkyAhJgACTEBEmICJMbm9MzaMCOfmoZv
+GycczIBEmICJMQESIgJkBATICEmQEJMgISYAAkxARJiAiTM6S9125Tdm+zf52QCJMQESIgJkBAT
ICEmQEJMgISYAAkxARJiAiTEBEiMzelNl/e47Vm8PJG/7XpPOJkACTEBEmICJMQESIgJkBATICEm
QEJMgISYAAkxARJHc/qpN6Lz52RqPfUspqbst/3eE/5d/HEyARJiAiTEBEiICZAQEyAhJkBCTICE
mAAJMQESYgIkfl5+W/bLXn5uG+bpL9/fKU4mQEJMgISYAAkxARJiAiTEBEiICZAQEyAhJkBCTIDE
9/P5/Ofd8Ia3p29w29T65TfDT/H3e87JBEiICZAQEyAhJkBCTICEmAAJMQESYgIkxARIiAmQWPF2
+qlr2DAjP2HKfm7qPrz8LKau18kESIgJkBATICEmQEJMgISYAAkxARJiAiTEBEiICZAYezv90UU8
PHs/seGN6Bvu74nbrnfKhvvgZAIkxARIiAmQEBMgISZAQkyAhJgACTEBEmICJMQESBzN6U/cNjnf
MEfecM82vD39xG0T+Zfvr5MJkBATICEmQEJMgISYAAkxARJiAiTEBEiICZAQEyDx/T3Y926YZZtP
7/Hy1wo22PAVjxNOJkBCTICEmAAJMQESYgIkxARIiAmQEBMgISZAQkyAxM+GGe7UTP+2+f+G6f2G
Z7HBhr+z236vkwmQEBMgISZAQkyAhJgACTEBEmICJMQESIgJkBATIPFz8sMbJrtTbpt7T93fqWex
YXq/4Rpuc3IfnEyAhJgACTEBEmICJMQESIgJkBATICEmQEJMgISYAImjOf2Jl9/2vuGt4VN8tj8b
vuIxZeq5OZkACTEBEmICJMQESIgJkBATICEmQEJMgISYAAkxARJjc/oN8+kTt13vhrn3bffsxIbP
tuF/gzj5WScTICEmQEJMgISYAAkxARJiAiTEBEiICZAQEyAhJkDi+7thl/2wqVn2bY/ttnn6lJfv
g5MJkBATICEmQEJMgISYAAkxARJiAiTEBEiICZAQEyDx/Xw+///G+DJTc+QNU+spG+7Zhre9v/yM
nUyAhJgACTEBEmICJMQESIgJkBATICEmQEJMgISYAImfkx/e8HbvKVMz59vm0y8/4xO33YcN1+tk
AiTEBEiICZAQEyAhJkBCTICEmAAJMQESYgIkxARIHM3pT2yYkW+YGHPOVxvObfhsTiZAQkyAhJgA
CTEBEmICJMQESIgJkBATICEmQEJMgMTYnJ5zG+b/U7Psk882dR82fLaTa5j6vVOcTICEmAAJMQES
YgIkxARIiAmQEBMgISZAQkyAhJgACXP6S03Nsqcm3Btm5Btm+hu+MjF1f51MgISYAAkxARJiAiTE
BEiICZAQEyAhJkBCTICEmACJsTn9htnwBre9Yfy2N7if2DB733B/pziZAAkxARJiAiTEBEiICZAQ
EyAhJkBCTICEmAAJMQESR3P6DXPv22x4K/uUl98if5sNn83JBEiICZAQEyAhJkBCTICEmAAJMQES
YgIkxARIiAmQ+BdH0FlG++rAUgAAAABJRU5ErkJggg==`;

const PrintToPDFs = () => {

   const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({
         html: generarPDF(),
         base64: false
      }); console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
   }

   const generarPDF = () => {

      let nombrePaciente = 'Daniel Felipe';
      let apellidoPaciente = 'Cosme';
      let cedulaPaciente = '11.254.254.210';
      let nombreDoctor = 'Daniel Felipe Cosme';
      let telefonoDoctor = '318 259 9197';

      // let imgQR = 
      // qrCode.toDataURL();
      // console.log(qrCode);

      const html = `
      <html>
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
         <style>${sttlesPDF}</style>
      </head>

      <body>
         <h1 class="titulo">Prescripción Odontológica</h1>
         <hr>
         <div>
            <div class="seccionQR">
               <h3>CÓDIGO QR</h3>
               <img src="${qrPrueba}" />
            </div>
            <div class="informacion">
               <div class="item-info">
                  <p class="item-titulo">Fecha:</p>
                  <p class="infoVariable">15 SEPTIEMBRE 2022</p>
               </div>
               <div class="item-info">
                  <p class="item-titulo">NOMBRE:</p>
                  <p class="infoVariable">${nombrePaciente} ${apellidoPaciente}</p>
               </div>
               <div class="item-info">
                  <p class="item-titulo">CÉDULA:</p>
                  <p class="infoVariable">${cedulaPaciente}</p>
               </div>
               <div class="item-info">
                  <p class="item-titulo">Doctor(A).:</p>
                  <p class="infoVariable">${nombreDoctor}</p>
               </div>
               <div class="item-info">
                  <p class="item-titulo">TELEFONO:</p>
                  <p class="infoVariable">${telefonoDoctor}</p>
               </div>
            </div>

         <hr>

            <div>
               <img class="imgQR" src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" />
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
         <Button title="Generate PDF" onPress={printToFile} />
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