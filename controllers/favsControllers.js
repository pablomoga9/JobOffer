const userCheck = require('../middlewares/verifiedToken')
const client = require("../models/admin");
const pool= require('../utils/dbElephant')
const query= require('../models/queries')

const createFav = async(req,res)=>{
    try{
        //Ejecutar "checkAuth" del middleware de verifiedToken
        let userId;//decoded id sacado de checkAuth
        const user = await client.query(query.getUsersById,[id]);
        await pool.query(pool.query(query.saveFavAd,[userId,req.body.id]))//Añadimos fav con id del user y el id traido del body
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {createFav}