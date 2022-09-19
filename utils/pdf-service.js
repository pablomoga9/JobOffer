const PDFDocument = require('pdfkit');

const buildPDF = async(dataCallback,endCallback)=>{
   
    const doc = new PDFDocument({compress:false});
    console.log(dataCallback);
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc
    .fontSize(25)
    .text(dataCallback);
    doc.end();
    
}

module.exports={
    buildPDF
}