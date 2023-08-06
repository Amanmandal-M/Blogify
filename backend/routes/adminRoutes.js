const express = require('express');
const adminRouter = express.Router();

const adminController = require('../controllers/adminController');
const { adminAuthentication } = require('../middlewares/adminAuthMiddleware');


// Create a new admin
adminRouter.post('/register', adminController.createAdmin);

// Log in admin
adminRouter.post('/login', adminController.loginAdmin);



// ------->>>> User Section <<<<---------

// Get all users
adminRouter.get('/', adminController.getAllUsers, adminAuthentication);

// Get a single user by ID
adminRouter.get('/:id', adminController.getUserById), adminAuthentication;

// Update a user by ID
adminRouter.put('/:id', adminController.updateUser, adminAuthentication);

// Delete a user by ID
adminRouter.delete('/:id', adminController.deleteUser, adminAuthentication);


// ------->>>> Blog Section <<<<---------

module.exports = adminRouter;
