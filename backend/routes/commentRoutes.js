const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentController');

// Get all comments
commentRouter.get('/', commentController.getAllComments);

// Create a new comment
commentRouter.post('/', commentController.createComment);

// Get a single comment by ID
commentRouter.get('/:id', commentController.getCommentById);

// Update a comment by ID
commentRouter.put('/:id', commentController.updateComment);

// Delete a comment by ID
commentRouter.delete('/:id', commentController.deleteComment);

module.exports = commentRouter;
