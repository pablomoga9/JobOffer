const express = require('express');
const adminControllers = require("../controllers/adminControllers");
const adminRouter = express.Router();

adminRouter.get('/search', adminControllers.getUsers_registered
);
adminRouter.post('users', adminControllers.createUser);
// adminRouter.put('/ads/', adsControllers.updateAd);
// adminRouter.delete('/ads/',adsControllers.deleteAd);

module.exports = adminRouter;