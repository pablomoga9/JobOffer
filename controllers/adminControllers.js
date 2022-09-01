const admin = require("../models/admin")


const getUsers_registered= async (req,res)=>{
    let adminview;
if(req.query.users_registered){
  adminview = await admin.getUsers(req.query.users_registered)
  console.log("Estos son los usuarios registrados: ", adminview);
}//else{
   // adminview = await admin.getTotalView()
//}
res.status(200).render('usersAdmin',({adminview})); 
}

module.exports={
    getUsers_registered
}