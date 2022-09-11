const express = require('express');
const favsControllers = require("../controllers/favsControllers");
const favsRouter = express.Router();

favsRouter.post('/favourites',favsControllers.createFav);
// favsRouter.delete('favourites',favsControllers.deleteFav);

module.exports = favsRouter;