const express = require('express');
const adminControllers = require("../controllers/adminControllers");
const adminRouter = express.Router();

adminRouter.get('/users', adminControllers.getUsersRegistered);
adminRouter.post('/users', adminControllers.createUser);
adminRouter.put('/users', adminControllers.updateUser);
adminRouter.put('/users/:newName',adminControllers.updateByUser)
adminRouter.delete('/users',adminControllers.deleteUser);


module.exports = adminRouter;