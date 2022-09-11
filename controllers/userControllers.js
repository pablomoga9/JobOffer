require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('../config/nodemailer');
const regex = require('../utils/regex');
const queries = require('../models/queries');
const {Pool} = require('pg');
const pool = require('../utils/dbElephant');
const bcrypt = require('bcrypt');
const saltRounds =  10;
const client = require("../models/admin");
const { transporter } = require('../config/nodemailer');
const sendUrl = 'http://localhost:3000';


const loginUser = async(req,res)=>{
    try{
        try{
            console.log(req.body);
            data = await client.getloginUser(req.body.email)
            console.log(data);
            if(!data){
                res.status(200).json({msg:'Usuario o contaseña incorrecta'});
            }
            else{
                const password= req.body.pass
                const hash = bcrypt.hashSync(password, saltRounds)
                console.log(typeof hash);
                const match = await bcrypt.compare(password,hash);
                if(match){
                    console.log("estoy en match");
                    await client.turnToLogged(req.body.email);
                    const {email,username} = data;
                    const userForToken = {
                        email:email,
                        username: username
                    };
                    const token = jwt.sign(userForToken, 'keyDePrueba',{expiresIn:'20m'});
                    res.status(200)
                    .json({
                        msg: 'Correct authentication',
                        token: token
                    });
                }else{
                    res.status(400).json({msg:'Usuario o contaseña incorrecta'})
                }
            }
        }   
        catch(error){
            console.log(error);
        }
    }
    catch(error){
        console.log(error.message);
    }
}



const registerUser = async(req,res)=>{
    try{
        // const hashPassword = bcrypt.hashSync(req.body.pass,11);
        let userRegisted= req.body
        try{
            console.log("hola 3");
             const hashPassword = bcrypt.hashSync(userRegisted.password,saltRounds);
            const data = await client.createRegisterUser(userRegisted,{ method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegisted)});
            res.status(201).json(data);
        }catch(error){
            console.log("error");
            res.status(400).json({msg:'Usuario o contaseña incorrecta'});
        }
    }
    catch(error){
        console.log(error.message);
    }
}


const recoverPassword = async(req,res)=>{
    try{
        //Comprobación de BDD datos si hay usuario con params.email
        const recoverToken = jwt.sign({email:req.params.email},'keyDePrueba',{expiresIn: '20m'});
        const url = `${sendUrl}/api/resetpassword/${recoverToken}`;
        await transporter.sendEmail({
            to:req.params.email,
            subject: 'Recuperar contraseña',
            html:`<h3>Recuperar contraseña</h3>
                <a href=${url}>Click para recuperar</a>
                <p>El link expirará en 20 minutos</p>`
        });
        res.status(200).json({
            message:'Un email de recuperación ha sido enviado a tu dirección de email'
        })
    }   
    catch(error){
        console.log(error);
    }
}

const restorePassword = async(req,res)=>{
    try{
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken,'keyDePrueba');
        const password = req.body.password;
        if(regex.validatePassword(password)){
            const hashPassword = await bcrypt.hash(password, saltRounds);
            await client.updateUser()
        }
    }
    catch(error){

    }
}

module.exports = {
    loginUser,
    registerUser,
    recoverPassword,
    restorePassword
}