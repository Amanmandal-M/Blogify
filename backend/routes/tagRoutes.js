const express = require('express');
const tagRouter = express.Router();
const tagController = require('../controllers/tagController');

// Create a new tag
tagRouter.post('/', tagController.createTag);

// Get all tags
tagRouter.get('/', tagController.getAllTags);

// Get a single tag by ID
tagRouter.get('/:id', tagController.getTagById);

// Update a tag by ID
tagRouter.put('/:id', tagController.updateTag);

// Delete a tag by ID
tagRouter.delete('/:id', tagController.deleteTag);

module.exports = tagRouter;
