const express = require('express');
const likeRouter = express.Router();
const likeController = require('../controllers/likeController');

// Get all likes
likeRouter.get('/', likeController.getAllLikes);

// Create a new like
likeRouter.post('/', likeController.createLike);

// Get a single like by ID
likeRouter.get('/:id', likeController.getLikeById);

// Update a like by ID
likeRouter.put('/:id', likeController.updateLike);

// Delete a like by ID
likeRouter.delete('/:id', likeController.deleteLike);

module.exports = likeRouter;
