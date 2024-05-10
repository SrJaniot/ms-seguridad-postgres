// Uncomment these imports to begin using these cool features!

// Uncomment these imports to begin using these cool features!

import {post, get, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';


//import para poder prosear el archivo excel y leerlo
//npm install exceljs
//npm install multer
//npm install --save-dev @types/multer
import * as ExcelJS from 'exceljs';

// import {inject} from '@loopback/core';


export class ExcelController {
  constructor() {}




    //funciones para excel--------------------------------------------------------------------------------------------------------------
  //funcion para subir un archivo excel y leerlo para insertar usuarios los datos en la base de datos
  @post('/upload', {
    responses: {
      '200': {
        description: 'Upload file',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async upload(
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const multer = require('multer');
    const upload = multer().single('file');

    return new Promise<object>((resolve, reject) => {
      upload(request, response, async (err: any) => {
        if (err) {
          //console.log("hola desde err")
          // An error occurred when uploading
          reject({message: 'Error uploading file.'});
        } else if (!request.file) {
          //console.log("hola desde !request.file")
          // No file was uploaded
          reject({message: 'No file was uploaded.'});
        } else {
          // Everything went fine
          //console.log(request.file.originalname); // Print the file name

          // Read the Excel file
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(request.file.buffer);

          // Do something with the workbook here
          //imprimir la cantidad de hojas que tiene el archivo excel
          //console.log(workbook.worksheets.length);
          //imprimir el nombre de la hoja
          //console.log(workbook.worksheets[0].name);
          //imprimir la cantidad de filas que tiene la hoja
          //console.log(workbook.worksheets[0].rowCount);
          //imprimir la cantidad de columnas que tiene la hoja
          //console.log(workbook.worksheets[0].columnCount);
          //imprimir el valor de la celda A1
          //console.log(workbook.worksheets[0].getCell('A1').value);
          //imprimir toda la columna A
          //console.log(workbook.worksheets[0].getColumn('A').values);
          //lee los datos de la hoja 1 y los imprime por registro de las columnas nombre, apellido.



          resolve({message: 'File uploaded successfully.'});
        }
      });
    });
  }



  @post('/upload2', {
    responses: {
      '200': {
        description: 'Upload file',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async upload2(
    @requestBody.file() request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const multer = require('multer');
    const upload = multer().single('file');

    return new Promise<object>((resolve, reject) => {
      upload(request, response, async (err: any) => {
        if (err) {
          reject({message: 'Error uploading file.'});
        } else if (!request.file) {
          reject({message: 'No file was uploaded.'});
        } else {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(request.file.buffer);

          const worksheet = workbook.worksheets[0];
          if (!worksheet) {
            reject({message: 'No worksheet found'});
          } else {
            let nombreColumnIndex = 0;
            let apellidoColumnIndex = 0;

            // Find the column indices
            worksheet.getRow(1).eachCell((cell, colNumber) => {
              if (cell.value === 'Nombre') nombreColumnIndex = colNumber;
              if (cell.value === 'Apellido') apellidoColumnIndex = colNumber;
            });

            // Process the rows
            worksheet.eachRow((row, rowNumber) => {
              //console.log(rowNumber)
              if (rowNumber > 1) { // Ignore the header row
                const nombreCell = row.getCell(nombreColumnIndex);
                const apellidoCell = row.getCell(apellidoColumnIndex);

                if (nombreCell && apellidoCell) {
                  const nombre = nombreCell.value;
                  const apellido = apellidoCell.value;
                  // Print the data of each row
                  console.log(`Nombre: ${nombre}, Apellido: ${apellido}`);
                } else {
                  console.log('Las celdas "Nombre" y/o "Apellido" no existen en la fila ' + rowNumber);
                }
              }
            });

            resolve({message: 'File uploaded successfully.'});
          }
        }
      });
    });
  }








  @get('/generate-excel', {
    responses: {
      '200': {
        description: 'Excel File',
        content: {'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {}},
      },
    },
  })
  async generateExcel(@inject(RestBindings.Http.RESPONSE) response: Response) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 10 },
      { header: 'Apellido', key: 'apellido', width: 10 },
      // Agrega aquí más columnas según sea necesario
    ];

    response.setHeader(
      'Content-Disposition',
      'attachment; filename=Formato.xlsx',
    );

    await workbook.xlsx.write(response);
    response.end();
  }


}
