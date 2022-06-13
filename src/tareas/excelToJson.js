const XLSX = require("xlsx");

const pais = {
    "pe": "Perú",
    "mx": "México",
    "gt": "Guatemala",
    "do": "República Dominicana",
    "ar": "Argentina",
    "pa": "Panamá",
    "co": "Colombia",
    "cu": "Cuba",
    "es": "España",
    "br": "Brasil",
    "ve": "Venezuela",
    "uy": "Uruguay",
    "ec": "Ecuador",
    "cl": "Chile",
    "cr": "Costa Rica"
}
const fecha = new Date().getDate() + " de mayo del 2022";
const modalidad = process.env.modalidad.toUpperCase();
const tabla = process.env.modalidad.toLowerCase();

const excelAJSON = () => {
  const excel = XLSX.readFile(`\assets/Tablas/Profesores ${tabla}.xlsx`);
  var nombreHoja = excel.SheetNames; // regresa un array
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

  const jDatos = [];
  for (let i = 0; i < datos.length; i++) {
    const dato = datos[i];
    dato.term = `Estimad${dato.term} Profesor${dato.term == 'a' ? 'a':''}`;
    dato.pais = pais[dato.pais];
    dato.fecha = fecha;
    dato.modalidad = modalidad;
    jDatos.push(dato);
  }
  return jDatos;
};

module.exports = {
    excelAJSON: excelAJSON
}