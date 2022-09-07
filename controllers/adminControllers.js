const admin = require("../models/admin");
const { getUsers } = require("../models/queries");
const queries = require("../models/queries");
require("pug")

// const getUsers_registered= async (req,res)=>{
//   try{let users = await admin.getUsers();

//  res.status(200).json({result:users}); // array [] con las entries encontradas
// }catch(error){
//   console.log(error.message);
//   }
// }

const getUsersRegistered= async(req,res) => {

 {
  try{let users = await admin.getUsers();

 res.status(200).render('usersAdmin',{users}); // array [] con las entries encontradas
}catch(error){
  console.log(error.message);
  }
}


}


const createUser = async(req,res) =>{
  const newUser = req.body;
  try {
      const response = await admin.createUsermodel(newUser,{ method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)})
      res.status(201).render('usersAdmin',{response})
  } catch (error) {
      console.log(error);
      res.status(404).render('usersAdmin', {response});
  }
}

// const createUser = async (req, res) => {
//   console.log("Esto es el consol.log de lo que introducimos por postman",); // Objeto recibido de producto nuevo
//   const newUser = ('userAdmin',{}); // {} nuevo producto a guardar
//   // Líneas
//   //para guardar 
//   // en una BBDD SQL o MongoDB
//   try {
//       let response = await admin.createUsermodel((newUser),{
//           method: "POST",
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(newUser)
//       })
//       let answer = await response.json(); // objeto de vuelta de la petición
//       console.log("Este es el console.log de lo que devuelve la api", answer);

//       res.status(201).render('usersAdmin',{answer})
//   }
//   catch {
//       res.status(400).render('usersAdmin',{answer})
//   }}
const updateUser = async(req,res)=>{
  try{
      if(req.body.email){
          const response = await admin.updateUser(req.body.full_name)
          res.status(200).render('usersAdmin',{"user actualizado":`${req.body.full_name}`})
      }
  }
  catch(error){
      res.status(400).render('usersAdmin',{"user NO actualizado":`${req.body.full_name}`})
  }
}

const deleteUser = async (req, res) => {
  const deleteUserByEmail = req.body.email;
  try {
    await admin.deleteUser(deleteUserByEmail);
    res
      .status(200)
      .render('usersAdmin', {
      "user borrado": `${deleteUserByEmail}`,
    });
  } catch (error) {
    res
      .status(400)
      .render('usersAdmin', { "user NO borrado": `${deleteUserByEmail}` });
  }
};

module.exports={
    getUsersRegistered,createUser,updateUser,deleteUser
}