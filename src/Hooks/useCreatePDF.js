import { useState } from 'react';
import * as Print from 'expo-print';

const sttlesPDF = `
@font-face {
   font-family: "Colgate Ready";
   src: url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.eot");
   src: url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.woff") format("woff"), url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/cb051b6f43b7fae342080025a7ca8b75.svg#Colgate Ready") format("svg");
}

* {
   font-family: 'Colgate Ready';
   color: #212121;
}

.titulo {
   font-size: 30px;
   font-weight: 900;
   text-align: center;
   text-transform: uppercase;
   color: #d2010d;
}

.seccionQR {
   width: min-content;
   padding: 16px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border-radius: 8px;
   background: #d2010d;
   position: absolute;
   right: 90px;
   top: 65px;
}

.seccionQR h3 {
   margin-top: 0px;
   margin-bottom: 3px;
   font-size: 15px;
   color: #fff;
   font-weight: 900;
}

.seccionQR img {
   width: 10vw;
   padding: 8px;
   border-radius: 8px;
   background: #fff;
}

.informacionDatos {
   margin: 8px 0 16px 8px;
}

.item-info {
   display: flex;
   align-items: center;
   margin-bottom: 8px;
}

.item-info p {
   margin: 0;
   padding: 4px 8px;
   background: #eeeeee;
   border-radius: 8px;
   font-size: 12px;
   text-transform: uppercase;
}

.item-info .item-titulo {
   width: 90px;
   font-weight: 900;
}

.item-info p.infoVariable {
   margin-left: 8px;
   width: 300px;
}

.seccion{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.listaProductos{
   height: 40vh;
   display: flex;
   flex-wrap: wrap;
}

.titulo-listaProductos{
   margin: 0px;
   font-weight: 900;
   color: #d2010d;
   text-transform: uppercase;
   text-align: center;
}

.productos {
   width: 44vw;
   margin: 4px;
   padding: 8px;
   display: flex;
   align-items: center;
   border: 2px solid #eeeeee;
   border-radius: 8px;
}

.productos .imagen-productos {
   width: 15vw;
}

.productos .imagen-productos img.imagenProducto {
   width: 100%;
}

.productos .informacion-productos {
   width: 30vw;
   margin-left: 16px;
}

.productos .informacion-productos .titulo-informacion {
   margin: 0px 0px 8px;
   font-size: 15px;
   font-weight: 900;
   color: #d2010d;
   text-transform: uppercase;
   text-align: left;
}

.productos .informacion-productos .descripcion-informacion {
   margin: 0px;
   padding: 0 8px;
   font-size: 10px;
   text-align: justify;
}

.recomendaciones {
   margin: 0;
   padding: 8px 16px;
   border: 2px solid #eeeeee;
   border-radius: 8px;
}

.recomendaciones h3.titulo-recomendaciones {
   margin: 0;
   font-weight: 900;
}

.recomendaciones p.texto-recomendaciones {
   margin: 0;
   text-align: justify;
}

.footer{
   width: 100%;
   position: absolute;
   bottom: 0px;
}

.seccionDoctor{
   width: 30vw;
}

.seccionDoctor .seccion-imagenes{
   display: flex;
}

.seccionDoctor .firma-doctor, .seccionDoctor .sello-doctor{
   width: 25vw;
}

.seccionDoctor .firma-doctor img, .seccionDoctor .sello-doctor img{
   width: 100%;
}

.seccionDoctor .separador-doctor{
   width: 100%;
}

.seccionDoctor .nombre-doctor{
   margin: 0px;
   font-weight: 900;
}

.seccionDoctor .cedula-doctor{
   margin: 0px;
   font-size: 10px;
}

.sugerencia{
   width: 100%;
}

.sugerencia p {
   width: 100%;
   margin: 0px;
   font-size: 10px;
   text-align: center;
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

export const useCreatePDF = () => {

   const [locationFile, setLocationFile] = useState();

   const printToFile = async (data) => {
      const { uri } = await Print.printToFileAsync({
         html: generarPDF(data),
         base64: false
      });

      setLocationFile(uri);
      // console.log(locationFile)
   }

   const generarPDF = (info) => {

      let nombrePaciente = info.nombrePaciente; //'Daniel Felipe';
      let apellidoPaciente = info.apellidoPaciente; //'Cosme';
      let cedulaPaciente = info.cedulaPaciente; //'11.254.254.210';
      let cedulaDoctor = info.cedulaDoctor; //'4.254.210';
      let nombreDoctor = info.nombreDoctor; //'Daniel Felipe Cosme';
      let telefonoDoctor = info.telefonoDoctor; //'318 259 9197';

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
            <div class="informacionDatos">
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
                  <p class="item-titulo">Doctor(A):</p>
                  <p class="infoVariable">${nombreDoctor}</p>
               </div>
               <div class="item-info">
                  <p class="item-titulo">TELÉFONO:</p>
                  <p class="infoVariable">${telefonoDoctor}</p>
               </div>
            </div>
         </div>

         <hr>

         <div class='seccion'>
            <h3 class="titulo-listaProductos">PRODUCTOS</h3>
            <div class='listaProductos'>

               <div class="productos">
                  <div class="imagen-productos">
                     <img class="imagenProducto" src="https://exitocol.vtexassets.com/arquivos/ids/13089180-1200-auto?v=637896231214870000&width=1200&height=auto&aspect=true" />
                  </div>
                  <div class="informacion-productos">
                     <h3 class="titulo-informacion">título</h3>
                     <p  class="descripcion-informacion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
                     atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
                     eligendi?</p>
                  </div>
               </div>

               <div class="productos">
                  <div class="imagen-productos">
                     <img class="imagenProducto" src="https://exitocol.vtexassets.com/arquivos/ids/13089180-1200-auto?v=637896231214870000&width=1200&height=auto&aspect=true" />
                  </div>
                  <div class="informacion-productos">
                     <h3 class="titulo-informacion">título</h3>
                     <p  class="descripcion-informacion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
                     atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
                     eligendi?</p>
                  </div>
               </div>

               <div class="productos">
                  <div class="imagen-productos">
                     <img class="imagenProducto" src="https://exitocol.vtexassets.com/arquivos/ids/13089180-1200-auto?v=637896231214870000&width=1200&height=auto&aspect=true" />
                  </div>
                  <div class="informacion-productos">
                     <h3 class="titulo-informacion">título</h3>
                     <p  class="descripcion-informacion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
                     atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
                     eligendi?</p>
                  </div>
               </div>

               <div class="productos">
                  <div class="imagen-productos">
                     <img class="imagenProducto" src="https://exitocol.vtexassets.com/arquivos/ids/13089180-1200-auto?v=637896231214870000&width=1200&height=auto&aspect=true" />
                  </div>
                  <div class="informacion-productos">
                     <h3 class="titulo-informacion">título</h3>
                     <p  class="descripcion-informacion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
                     atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
                     eligendi?</p>
                  </div>
               </div>

               <div class="productos">
                  <div class="imagen-productos">
                     <img class="imagenProducto" src="https://exitocol.vtexassets.com/arquivos/ids/13089180-1200-auto?v=637896231214870000&width=1200&height=auto&aspect=true" />
                  </div>
                  <div class="informacion-productos">
                     <h3 class="titulo-informacion">título</h3>
                     <p  class="descripcion-informacion">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio,
                     atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga
                     eligendi?</p>
                  </div>
               </div>
            </div>
         </div>

            <hr>
         <div class="recomendaciones">
            <h3 class='titulo-recomendaciones'>RECOMENDACIONES ADICIONALES</h3>
            <p class='texto-recomendaciones'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem doloremque consequatur hic officia a optio, atque veritatis voluptatum, cum, exercitationem totam ipsum veniam neque asperiores iusto omnis enim fuga eligendi?</p>
         </div>

         <div class='footer'>
            <div class='seccionDoctor'>
               <div class='seccion-imagenes'>
                  <img class='firma-doctor' src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" />
                  <img class='sello-doctor' src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" />
               </div>
               <hr class="separador-doctor">
               <p class="nombre-doctor">Dr(a).: ${nombreDoctor}</p>
               <p class="cedula-doctor">C.C.: ${cedulaDoctor}</p>
            </div>
            <br />
            <div class='sugerencia'>
               <p>Encuentre los productos en</p>
               <p>Drogas la Rebaja, Farmatodo, Droguerías Alemana, Cruz Verde, Farmacias Pasteur, Locatel</p>
            </div>
         </div>

      </body>
      </html>
      `;

      return html;
   }

   return {
      locationFile,
      printToFile
   };
}