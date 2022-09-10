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

const getUsersRegistered = async (req, res) => {
  try {
    let users = await admin.getUsers();

    res.status(200).render("usersAdmin", { users }); // array [] con las entries encontradas
  } catch (error) {
    console.log(error.message);
  }
};


// const createUser = async(req,res) =>{
//   const newUser = req.body;
//   try{
//     let response = await fetch('http://localhost:3000/users', {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//     })
//     let answer = await response.json(); // objeto de vuelta de la petición
//     console.log("Este es el console.log de lo que devuelve el post de usuarios",answer);
//     res.status(201).send(`usuario guardado en el sistema`);
  
//   }catch(error){
//     console.log(`ERROR: ${error.stack}`);
//     res.status(400).send(`Error guardando usuarios`);
//   }
// }




const createUser = async(req,res) =>{
  const newUser = req.body;
  try {
      const response = await admin.createUsermodel(newUser,{ method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)})
      res.status(201).json({"user saved": response})
  } catch (error) {
      console.log(error);
      res.status(400).json({"message":"could not create"});
  }
}



const updateUser = async(req,res)=>{
  const updatedUser= req.body
  try{
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
    getUsersRegistered,createUser,updateUser,deleteUser
}