require('dotenv').config();
const admin = require("../models/admin");
const { getUsers } = require("../models/queries");
const queries = require("../models/queries");
require("pug")
const jwt = require('jsonwebtoken');

const getUsersRegistered = async (req, res) => {
  try {
    let users = await admin.getUsers();

    res.status(200).render("usersAdmin", { users }); 
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async(req,res) =>{
  const newUser = req.body;
  try {
      const response = await admin.createUsermodel(newUser
        ,
        { method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)}
      )
      res.status(201).json({"user saved": response})
  } catch (error) {
      console.log(error);
      res.status(400).json({"message":"could not create"});
  }
}



const updateUser = async(req,res)=>{
  const updatedUser= req.body
  try{
    console.log("not controller")      
    const response = await admin.updateUser(updatedUser,{ method: "PUT",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)})
          res.status(200).json({"user updated": response})
      }
  catch(error){
    res.status(400).json({"message":"could not update"});
  }
}

const updateByUser = async(req,res)=>{
  let updatedUser;
  try{
         
          let cookies = (req.headers.cookie).slice(12);
          let decoded = jwt.verify(cookies,process.env.SECRET);
          updatedUser = {
            name:req.body.newName,
            email:decoded.email
          }
          console.log(updatedUser);
          const response = await admin.updateByUser(updatedUser)
          //   ,{ 
          //   method: "PUT",
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/json'
          // },
          // body: JSON.stringify(updatedUser)})
          res.status(200).json({"user updated": response})
      }
  catch(error){
    res.status(400).json({"message":"could not update"});
  }
}

const deleteUser = async (req, res) => {
  const email = req.query.email;
  console.log(email);
  try {
    const response = await admin.deleteUser(email);
    res.status(200).json({"user deleted":response})
  } catch (error) {
    res.status(400).json({"message":"could not delete user"});
  }
};

module.exports={
    getUsersRegistered,createUser,updateUser,deleteUser,updateByUser
}