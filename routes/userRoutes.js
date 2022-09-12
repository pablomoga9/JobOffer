const routes = require('express').Router();
const userController = require('../controllers/userControllers');

routes.post('/login', userController.loginUser)
routes.post('/signup',userController.registerUser);
routes.get('/logout/:email',userController.logout);
routes.get('/recoverPassword/:email', userController.recoverPassword);
routes.put('/resetPassword/:recoverToken', userController.restorePassword);

module.exports  = routes;