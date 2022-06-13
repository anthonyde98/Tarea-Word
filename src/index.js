const dotenv = require('dotenv');
dotenv.config();

const excelToJson = require("../src/tareas/excelToJson");
const profesores = excelToJson.excelAJSON();
const generarDoc = require("../src/tareas/genDoc");

generarDoc.generarDoc(profesores);
