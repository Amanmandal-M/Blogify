const express = require('express');
const blogRouter = express.Router();

const blogPostController = require('../controllers/blogPostController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Get all blog posts
blogRouter.get('/', authenticateUser, blogPostController.getAllBlogPosts);

// Create a new blog post
blogRouter.post('/', authenticateUser, blogPostController.createBlogPost);

// Get a single blog post by ID
blogRouter.get('/:id', authenticateUser, blogPostController.getBlogPostById);

// Update a blog post by ID
blogRouter.put('/:id', authenticateUser, blogPostController.updateBlogPost);

// Delete a blog post by ID
blogRouter.delete('/:id', authenticateUser, blogPostController.deleteBlogPost);

module.exports = blogRouter;
