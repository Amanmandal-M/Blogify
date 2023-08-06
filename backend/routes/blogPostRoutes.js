const express = require('express');
const blogRouter = express.Router();
const blogPostController = require('../controllers/blogPostController');

// Get all blog posts
blogRouter.get('/', blogPostController.getAllBlogPosts);

// Create a new blog post
blogRouter.post('/', blogPostController.createBlogPost);

// Get a single blog post by ID
blogRouter.get('/:id', blogPostController.getBlogPostById);

// Update a blog post by ID
blogRouter.put('/:id', blogPostController.updateBlogPost);

// Delete a blog post by ID
blogRouter.delete('/:id', blogPostController.deleteBlogPost);

module.exports = blogRouter;
