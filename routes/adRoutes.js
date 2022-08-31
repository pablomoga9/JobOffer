const express = require('express');
const adsControllers = require("../controllers/adsControllers");
const adsRouter = express.Router();

adsRouter.get('/search/', adsControllers.getAds);
adsRouter.post('/ads/', adsControllers.createAd);
adsRouter.put('/ads/', adsControllers.updateAd);
adsRouter.delete('/ads/',adsControllers.deleteAd);

module.exports = adsRouter;