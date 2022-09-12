const userCheck = require('../middlewares/verifiedToken')
const client = require("../models/admin");
const jwt = require('jsonwebtoken');
const adsSchema = require('../schemas/adsSchemas');
// const pool= require('../utils/dbElephant')
// const query= require('../models/queries')

const getMyFavs = async (req, res) => {
    try {
     
      let getData = [];
      let getData2 = [];
      let cookies = (req.headers.cookie).slice(12);
      let decoded = jwt.verify(cookies,'keyDePrueba')
      let favs = await client.getFavAds(decoded.email);
    
      for(i=0;i<favs.length;i++){
        getData.push(favs[i].ad);
        }
       
      for(i=0;i<getData.length;i++){
        const element = await adsSchema.find({_id:getData[i]},'-_id');
        getData2.push(element);
      }
      
      
      return res.status(200).json(getData2);
     
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