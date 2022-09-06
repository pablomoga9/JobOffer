const admin = require("../models/admin");
const queries = require("../models/queries");
require("pug")

const getUsers_registered = async (req, res) => {

    try {
      let Users_registered = await admin.getUsers();
      return res.status(200).json({ Users_registered });
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
      res
        .status(404)
        .json({ message: "users registrados no encontrados" }); // lo ponemos aqui a esto para que si falla el fetch no me de timeout y me pinte el array vacio
      //el .status(200) es para que me devuelva ese numero de codigo de que todo ha ido bien (200) o error(404)
    }

  }



// const getUsers_registered = async (req, res) => {
//   try {
    
//     adminview = await admin.getUsers();
//     console.log("Estos son todos los usuarios registrados");
//     res.status(200).json("Users registered", { adminview });
//     return adminview
//   } catch (error) {
//     console.log(error.stack);
//     res.status(404).render("error", { message: "users not found" });
//   }
// };


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