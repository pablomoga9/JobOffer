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
                    return res.cookie('keyDePrueba', token, {
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
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

module.exports = {
    loginUser,
    registerUser
}