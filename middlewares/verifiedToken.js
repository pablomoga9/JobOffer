const express = require('express');
const jwt = require('jsonwebtoken');
const admin= require('../models/admin')
const protectedRoutes = express.Router();

protectedRoutes.use((req,res,next)=>{
    const cookies = req.headers.cookie;
    console.log(cookies);
    if(cookies){
        console.log("cookies");
    }
    else{
        console.log("no cookies");
    }
    // const token = req.headers['access_token'];
    if(token){
        jwt.verify(token,'keyDePrueba', async (err, decoded) => {
            let data = await admin.getUserByEmail(decoded.email);
            if(data.logged==true){
                req.decoded = decoded;
                next();
            }
            else{
                return res.json({message: 'Invalid token'})
            }
        });
    }else{
        res.send({
            msg:'Token not provided'
        });
    }
});

//check current user
const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'keyDePrueba',async(err,decoded)=>{
            if(err){
                res.locals.user = null;
                next();
            }
            else{
                let user = await admin.getUsersById(decoded.id)
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user  =null;
        next();
    }
}

module.exports = protectedRoutes