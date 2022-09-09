const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models')

const protectedRoutes = express.Router();

protectedRoutes.use((req,res,next)=>{
    const token = req.headers['access_token'];

    if(token){
        jwt.verify(token,jwt_secret, async (err, decoded) => {
            // let data = await 
        })
    }
})