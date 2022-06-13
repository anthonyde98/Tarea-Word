const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const sendEmailer = require("../tareas/senEmails");
const converter = require("../tareas/convertToPdf")

const carta = process.env.modalidad.toLowerCase();
const modalidad = process.env.modalidad;

// Load the docx file as binary content
const generarDoc = async (profesores) => {

    profesores.forEach(async (profesor) => {
        const content = fs.readFileSync(
            path.resolve("\assets/Cartas templeate", `Carta ${carta}.docx`),
            "binary"
        );
        
        const zip = new PizZip(content);
        
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
    
        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    
        doc.render(profesor);
        
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
        
        const archivo = `Carta de Reconocimiento ${profesor.nombre} ${profesor.apellido}-Relme-35.docx`
        // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
        const direccion = `\assets/Cartas ${modalidad}`;
        fs.writeFileSync(path.resolve(direccion, archivo), buf);

        await converter.ConvertDocToPdf(direccion, archivo);

        fs.unlinkSync(`${direccion}/${archivo}`);

        sendEmailer.sendEmail({correo: profesor.correo, direccion: direccion, archivo: archivo.split(".docx")[0] + ".pdf"});
    })

    
}

module.exports = {
    generarDoc: generarDoc
}