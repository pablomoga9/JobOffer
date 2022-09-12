const userCheck = require('../middlewares/verifiedToken')
const client = require("../models/admin");
const jwt = require('jsonwebtoken');
// const pool= require('../utils/dbElephant')
// const query= require('../models/queries')

const getMyFavs = async (req, res) => {
    try {
      email= req.body.email
      let favs = await client.getFavAds(email);
  
      res.status(200).render("favourites", { favs }); // array [] con las entries encontradas
    } catch (error) {
      console.log(error.message);
    }
  };

const createFav = async(req,res)=>{
    let cookies = (req.headers.cookie).slice(12); 
    try{
      if(cookies){
        let decoded = jwt.verify(cookies,'keyDePrueba')
          let favData = {
            email:decoded.email,
            id:req.body.id
          }
          const saveFavs= await client.createFavAd(favData,{method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(favData)})
          
       
        // [userId,req.body.id]  //Añadimos fav con id del user y el id traido del body
      }
      
    }
    catch(error){
        console.log(error.message);
    }
}

const deleteFavAd = async (req, res) => {
  const ad = req.query.ad;
  console.log(ad);
  try {
    const response = await client.deleteFavAd(ad);
    res.status(200).json({"fav deleted":response})
  } catch (error) {
    res.status(400).json({"message":"could not delete fav"});
  }
};




module.exports = {createFav,getMyFavs,deleteFavAd}