const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../utils/dbElephant');
const queries = require('../models/queries');
const protectedRoutes = express.Router();

protectedRoutes.use((req,res,next)=>{
    const token = req.headers['access_token'];

    if(token){
        jwt.verify(token,jwt_secret, async (err, decoded) => {
            let client;
            client = await pool.connect();
            let data = await client.query(queries.getUserByEmail,[decoded.email]);
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

module.exports = protectedRoutes;