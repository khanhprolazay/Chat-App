const auth = require('./auth');
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/AuthController');

AuthRouter.post('/signup', AuthController.createNewUser);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.post('/token/get_new_access_token', AuthController.getNewAccessToken)

module.exports = AuthRouter;
