const jwt = require('jsonwebtoken');
const nodemailer = require('../config/nodemailer');
const regex = require('../utils/regex');




const loginUser = async(req,res)=>{
    try{
        console.log(req.body);
    }
    catch(error){
        console.log(error.message);
    }
}

const registerUser = async(req,res)=>{
    try{
        console.log(req.body)
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    loginUser,
    registerUser
}