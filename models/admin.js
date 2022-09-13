const pool= require('../utils/dbElephant')
require('dotenv').config()
const query= require('../models/queries')
// const queries = require('../models/queries')
const { registerUser } = require('../models/queries')
const tokenUser= require('../middlewares/verifiedToken')
// const { Pool } = require('pg')

    const getUsers = async () => {
    let client,result
    try{
        // client = await pool.connect(); // Espera a abrir conexion
        const data = await pool.query(query.getUsers)
        result = data.rows
        console.log("Estas en el modelo",result);
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getUsersById= async (id) => {
    let client,result;
    try{
       
        const data = await pool.query(query.getUsersById,[id])
        result = data.rows
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getUserByEmail= async (email) => {
    let client,result;
    try{
       
        const data = await pool.query(query.getUserByEmail,[email])
        result = data.rows
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

// const getUserByEmail = async(email)=>{
//     let result;
//     try{
//         const data = await pool.query(query.getUserByEmail2)
//         result = data.rows;
//     }
//     catch(error){
//         console.log(error);
//     }
//     return result;
// }

const createUsermodel = async (user) => {
    const{id,email,password,full_name,role,logged}=user
    let result;
    try {
        const data = await pool.query(query.createUser,[id,email,password,full_name,role,logged])
        result = data.rows
        return result
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (userUpdated) => {
    
    const {full_name,email} = userUpdated;
    let client,result;
    try{
        const data = await pool.query(query.updateUser,
                                        [full_name,email])
        result = data.rowCount
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const updateByUser = async (userUpdated)=>{
    let client,result;
    try{
        const data = await pool.query(query.updateUser,
                                        [userUpdate.newName,userUpdate.email])
        result = data.rowCount
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const deleteUser = async (email) => {
    let client,result;
    try{
        const data = await pool.query(query.deleteUser,
                                        [email])
        result = data.rowCount
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getloginUser = async (email) => {
    let result;
    try{
        const data = await pool.query(query.loginUser,[email])
        result = data.rows
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const turnToLogged= async (email) => {
    let client,result;
    try{
        const data = await pool.query(query.turnToLogged,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }
    return result
}

const turnToNoLogged = async(email)=>{
    let result
    try{
        const data = await pool.query(query.turnToNoLogged,[email])
        result = data.rows;
        return result;
    }
    catch(error){
        console.log(error);
    }
}


const createRegisterUser = async (registerUser) => {
    const {email,full_name,password} = registerUser;
    let result;

    try{
        const data = await pool.query(query.registerUser,[email,full_name,password])
        console.log(data)
        result = data.rowCount
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getrecoverPassword = async () => {
    let client,result;
    try{
        const data = await pool.query(query.recoverPassword)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }
    return result
}

const updatePassword = async (passwordUpdated) => {
    const {password,email} = passwordUpdated;
    let client,result;
    try{
        const data = await pool.query(query.changePassword,
                                        [password,email])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }
    return result
}

const getFavAds= async (email) => {
    let client,result;
    try{
       
        const data = await pool.query(query.getFavAds,[email])
        
        return data.rows;
    }catch(err){
        console.log(err);
        throw err;
    }
}


const createFavAd = async (favAd) => {
    const favparameters= {
        checkedUser:favAd.email,
        adId:favAd.id
    }
    
    let client,result;
    try{
       
        const data = await pool.query(query.saveFavAd,[favparameters.checkedUser,favparameters.adId])
        
        result = data.rowCount
        // console.log(result);
        return result
    }catch(err){
        console.log(err);
        throw err;
    }
}

const deleteFavAd= async (ad) => {
    let client,result;
    try{
        const data = await pool.query(query.deleteFavAd,
                                        [ad])
        result = data.rowCount
        return result
    
    }catch(err){
        console.log(err);
        throw err;
    }}


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

const checkAdmin = async(email)=>{
    try{
       
        const data = await pool.query(query.checkAdmin,[email]);
       
        if(data.rows[0].role == 'admin'){
           
            return data.rows[0];
            
        }
       
    }
    catch(error){
        console.log(error);
    }
}

const checkLoggedQ = async(email)=>{
    try{
       const data = await pool.query(query.checkLogged,[email]);
       console.log(data.rows[0]);
       if(data.rows[0].logged == true){
            // console.log("logged");
            return data.rows[0];
       }
       else{
        console.log("not")
       }
    }
    catch(error){
        console.log(error)
    }
}




module.exports={
    getUsers,
    getUsersById,
    createUsermodel,
    updateUser,
    deleteUser,
    getloginUser,
    turnToLogged,
    createRegisterUser,
    getrecoverPassword,
    updatePassword,
    getFavAds,
    createFavAd,
    deleteFavAd,
    getUserProfile,
    turnToNoLogged,
    getUserByEmail,
    checkAdmin,
    checkLoggedQ
}