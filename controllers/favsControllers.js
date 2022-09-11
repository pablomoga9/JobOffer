const userCheck = require('../middlewares/verifiedToken')
const client = require("../models/admin");
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
    newFav=req.body.id //este es el id de la oferta de mongo
    try{
        const saveFavs= await client.createFavAd(newFav,{method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFav)})
        // [userId,req.body.id]  //Añadimos fav con id del user y el id traido del body
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