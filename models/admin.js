const pool= require('../utils/dbElephant')
require('dotenv').config()
const query= require('../queries')

    const getUsers = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(getUsers)
        result = data.rows
        console.log("Estas en el modelo",result);
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getUsersById= async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(getUsersById)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const createUsermodel = async (user) => {
    const{id,email,password,full_name,role}=user
    let client,result;
    try {
         client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(createUser,[id(4),email('nuevousuario@gmail.com'),password('password'),full_name('Solan de Cabras'),role('client')])
        result = data.rows
        res.status(201).json({"new user created": result})
    } catch (error) {
        console.log(error);
        res.status(400).json({"message":"Fallo la creacion de usuario"})
    }finally{
        // client.release();    
    }
    return result
}

module.exports={
    getUsers,getUsersById, createUsermodel
}