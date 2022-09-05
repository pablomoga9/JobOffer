const admin = require("../models/admin")
const users=require("../utils/dbElephant")


const getUsers_registered= async (req,res)=>{
    let adminview;
if(req.query.id){
  adminview = await admin.getUsersById(req.query.id)
  console.log("Estos son los id de usuarios registrados: ", adminview);
}else{
  adminview = await admin.getUsers()
  console.log("Estos son todos los usuarios registrados");
}
res.status(200).render('usersAdmin',({adminview}));
}

const createUser = async(req,res) =>{
  try {
      const newUser = req.body;
      const response = await admin.createUsermodel(newUser)
      res.status(201).json({"New user saved": response
})
  } catch (error) {
      console.log(error);
      res.status(400).json({"message":"user no creado"})
  }
}
module.exports={
    getUsers_registered,createUser
}