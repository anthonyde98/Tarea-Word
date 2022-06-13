const libre = require('libreoffice-convert');
const path = require('path');
const fs = require('fs');

const ConvertDocToPdf = async (direccion, archivo) => {
    try {
        const inputPath = path.join(direccion, archivo);
        const outputPath = path.join(direccion, `/${archivo.split(".docx")[0]}.pdf`);
        let docData = await fs.readFileSync(inputPath)
        return new Promise((resolve, reject) => {
            libre.convert(docData, '.pdf', undefined, (err, done) => {
                if (err) {
                    reject('Convertion Failed')
                }
                fs.writeFileSync(outputPath, done);
                resolve("Convertion successfull")

            });
        })
    } catch (err) {
        console.log("Error in input reading", err);
    }
}

module.exports = {
    ConvertDocToPdf: ConvertDocToPdf
}