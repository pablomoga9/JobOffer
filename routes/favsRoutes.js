const express = require('express');
const favsControllers = require("../controllers/favsControllers");
const favsRouter = express.Router();

//Web 
favsRouter.get('/favourites',favsControllers.getMyFavs)
favsRouter.post('/favourites',favsControllers.createFav);
favsRouter.delete('/favourites',favsControllers.deleteFavAd);
// favsRouter.delete('favourites',favsControllers.deleteFav);


module.exports = favsRouter;