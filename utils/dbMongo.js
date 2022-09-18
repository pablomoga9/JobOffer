const mongoose = require("mongoose");
require('dotenv').config();
const autoIncrement = require('mongoose-auto-increment');

const dbUrl = `mongodb+srv://pablo9:${process.env.DBPASS}@jobads.fhisfl5.mongodb.net/adsDB?retryWrites=true&w=majority`;


const connectionParams = {
    useNewUrlParser: true, ssl: true
}

mongoose
.connect(dbUrl, connectionParams)
.then(()=>{
    console.info("Connected")
})
.catch((e)=>{
    console.log("Error:", e);
})

const db = mongoose.connection;
autoIncrement.initialize(db);

db.on("error", error => console.log(error));
db.once("open", ()=> console.log("conexion con mongoAtlas establecida"));