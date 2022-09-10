const routes = require('express').Router();
const userController = require('../controllers/userControllers');

routes.post('/login', userController.loginUser)
routes.post('/signup',userController.registerUser);
// routes.get('/logout',userController.logoutUser);
// routes.get('/recoverPassword7/:email', userController.recoverPassword);
// routes.put('/resetPassword/:recoverToken', userController.resetPassword);

module.exports  = routes;