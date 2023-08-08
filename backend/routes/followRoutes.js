const express = require('express');
const followRouter = express.Router();
const followController = require('../controllers/followController');

// Get all follows
followRouter.get('/', followController.getAllFollows);

// Create a new follow
followRouter.post('/', followController.createFollow);

// Get a single follow by ID
followRouter.get('/:id', followController.getFollowById);

// Delete a follow by ID
followRouter.delete('/:id', followController.deleteFollow);

module.exports = followRouter;
