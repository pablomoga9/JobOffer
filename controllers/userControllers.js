require('dotenv').config();
const jwt = require('jsonwebtoken');
const Transporter = require('../config/nodemailer');
const regex = require('../utils/regex');
const bcrypt = require('bcrypt');
const saltRounds =  10;
const client = require("../models/admin");
const sendUrl = 'http://localhost:3000';
const jwtSecret = process.env.SECRET;


const loginUser = async(req,res)=>{
    
        try{
        
            let data = await client.getloginUser(req.body.email)
           
            if (!data) {
              res.status(200).json({ msg: "Usuario o contaseña incorrecta" });
            } else {
              const password = req.body.pass;
              const hash = bcrypt.hashSync(password, saltRounds);
              const match = await bcrypt.compare(password, hash);

              if (match) {
                 await client.turnToLogged(data[0].email);
                const userForToken = {
                  email: data[0].email,
                  username: data[0].full_name,
                };
     
                const token = jwt.sign(userForToken, process.env.SECRET, {
                  expiresIn: 5000,
                });
                res.cookie("acces-token", token, { httpOnly: true,
                sameSite:"strict" }).send();
                }
              else {
              
                res.status(400).json({ msg: "Usuario o contaseña incorrecta" });
              }
            }
        }   
        catch(error){
            console.log(error);
        }
   
}



const registerUser = async(req,res)=>{
    try{
        // const hashPassword = bcrypt.hashSync(req.body.pass,11);
        let userRegisted= req.body
        try{
          
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
       
        let data = await client.getUserByEmail(req.params.email)
        if(data){
            const recoverToken = jwt.sign({email:req.params.email},process.env.SECRET,{expiresIn: '20m'});
            const url = `${sendUrl}/api/resetpassword/${recoverToken}`;
            await Transporter.sendEmail({
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
        else{
            res.status(404).json({message:'No existe un usuario con ese email'});
        }
       
    }   
    catch(error){
        console.log(error);
    }
}

const restorePassword = async(req,res)=>{
    try{
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken,process.env.SECRET);
        const password = req.body.password;
        if(regex.validatePassword(password)){
            const hashPassword = await bcrypt.hash(password, saltRounds);
            const newData = {
                email: payload.email,
                password: hashPassword
            }
            await client.updateUser(newData,{ method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)})
        }
        else{
            res.status(400).json({msg: 'Password debe tener 8 caracteres, una minúscula, una mayúscula y un caracter especial'});
        }
        res.status(200).json({message: 'Password actualized'});
    }
    catch(error){
        console.log(error)
    }
}

const logout = async(req, res) => {
    let data;
    try {
        console.log("doing");
        let cookies = req.headers.cookie;
        let cookiesSlice = cookies.slice(12);
        let decoded = jwt.verify(cookiesSlice,process.env.SECRET);
        
        data = await client.turnToNoLogged(decoded.email);
        res.status(200).json({Msg: 'Logout'})
        
        
    } catch (error) {
        console.log('Error:', error);
    }
}

const checkUser = async(req,res)=>{
    try{
       
        const cookies = req.slice(12); 
        let decoded = jwt.verify(cookies,process.env.SECRET)
        let check = await client.checkAdmin(decoded.email);
        
        if(check.role =="admin"){
            // console.log(check);
            return true;
        }
        if(check.role !== "admin"){
            return false
        }
        
    }
    catch(error){
        console.log(error);
    }
}


const checkLogged = async(req,res)=>{
    try{
        const cookies = req.slice(12);
        let decoded = jwt.verify(cookies,process.env.SECRET);
        let loggedUser = await client.checkLoggedQ(decoded.email);
        
        if(loggedUser.logged==true){
            return true
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    loginUser,
    registerUser,
    recoverPassword,
    restorePassword,
    logout,
    checkUser,
    checkLogged
}