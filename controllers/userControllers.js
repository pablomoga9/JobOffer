require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('../config/nodemailer');
const regex = require('../utils/regex');
const queries = require('../models/queries');
const {Pool} = require('pg');
const pool = require('../utils/dbElephant');
const bcrypt = require('bcrypt');
const jwt_secret = "secret key del .env";
const saltRounds =  10;

const loginUser = async(req,res)=>{
    try{
        console.log(req.body);
        let data;
        let client, result;
        try{
            client = await pool.connect();
            const {email,password} = req.body;
            data = await client.query(queries.getUserByEmail,[email]);
            if(!data){
                res.status(200).json({msg:'Usuario o contaseña incorrecta'});
            }
            else{
                const match = await bcrypt.compare(password, data.password);
                if(match){
                    await client.query(queries.turnToLogged,[req.body.email]);
                    const {email,username} = data;
                    const userForToken = {
                        email:email,
                        username: username
                    };
                    const token = jwt.sign(userForToken, jwt_secret,{expiresIn:'20m'});
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
    let data;
    let client;
    try{
        const {email,password,username} = req.body;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        if(regex.validateEmail(email)&& regex.validatePassword(password)){
            client = await pool.connect();
            data = await client.query(queries.createUser,[id,email,password,username,"user"]);
            res.status(201).json(data);
        }else{
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