const express = require('express');
const adsControllers = require("../controllers/adsControllers");
const adsRouter = express.Router();

adsRouter.get('/search', adsControllers.getAds);
adsRouter.post('/ads/create', adsControllers.createAd);
adsRouter.put('/ads/update/', adsControllers.updateAd);
adsRouter.delete('/ads/delete/',adsControllers.deleteAd);
// adsRouter.get('ads/pdf',adsControllers.sendPdf)

module.exports = adsRouter;