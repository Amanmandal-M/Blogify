const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Create a new user
userRouter.post('/register', userController.createUser);

// Log in user
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;

