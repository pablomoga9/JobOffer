const pool= require('../utils/dbElephant')
require('dotenv').config()
const query= require('../models/queries')
const queries = require('../models/queries')
const { registerUser } = require('../models/queries')

    const getUsers = async () => {
    let client,result
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(query.getUsers)
        result = data.rows
        console.log("Estas en el modelo",result);
        return result
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
        const data = await client.query(query.getUsersById)
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
        const data = await client.query(query.createUser,[id(4),email('nuevousuario@gmail.com'),password('password'),full_name('Solan de Cabras'),role('client')])
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

const updateUser = async (userUpdated) => {
    const {full_name,email} = userUpdated;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser,
                                        [full_name,email])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const deleteUser = async (email) => {
    let client,result;
    client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(queries.deleteUser,
                                        [email])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getloginUser = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.loginUser)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const createRegisterUser = async (registerUser) => {
    const {email,password,full_name} = registerUser;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.registerUser,[email,password,full_name])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getrecoverPassword = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.recoverPassword)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const updatePassword = async (passwordUpdated) => {
    const {password,email} = passwordUpdated;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.changePassword,
                                        [password,email])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getfavAds = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.favAds,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


const createFavAd = async (favAd) => {
    const {id,email,ad} = favAd;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.saveFavAd,[id,email,ad])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const deleteFavAd= async (ad) => {
    let client,result;
    client = await pool.connect(); // Espera a abrir conexion
    try{
        const data = await client.query(queries.deleteFavAd,
                                        [ad])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}


const getUserProfile = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.userProfile,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}




module.exports={
    getUsers,getUsersById, createUsermodel, updateUser, deleteUser, getloginUser,createRegisterUser,getrecoverPassword,updatePassword,getfavAds,createFavAd,deleteFavAd, getUserProfile
}