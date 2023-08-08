const { BlogPostModel, CategoryModel , CommentModel, UserModel, FollowModel, LikeModel, TagModel} = require("../models/allModels");

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPostModel.findAll();
    
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
};

const createBlogPost = async (req, res) => {
  try {
    const { title, content, publicationDate, categoryIds, tagIds } = req.body;
    const currentUser = req.user; // Assuming you have middleware that adds the user to the request

    // Create the new blog post
    const newBlogPost = await BlogPostModel.create({
      title,
      content,
      publicationDate,
      authorId: currentUser.dataValues.id // Set the authorId
    });

    // Associate categories with the new blog post
    if (categoryIds && categoryIds.length > 0) {
      const categories = await CategoryModel.findAll({
        where: {
          id: categoryIds
        }
      });

      await newBlogPost.addCategories(categories);
    }

    // Associate the selected tags with the blog post
    if (tagIds && tagIds.length > 0) {
      await newBlogPost.setTags(tagIds);
    }

    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: 'Error creating blog post' });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const blogPostId = req.params.id;

    // Fetch the blog post along with its associated categories, comments, likes, and tags
    const blogPost = await BlogPostModel.findOne({
      where: { id: blogPostId },
      include: [
        {
          model: CategoryModel,
          attributes: ["id", "name", "createdAt", "updatedAt"],
        },
        {
          model: CommentModel,
          attributes: ["id", "text", "createdAt", "updatedAt"],
          include: {
            model: UserModel,
            attributes: ["id", "username", "email"],
          },
        },
        {
          model: LikeModel, // Include the likes
          attributes: ["id", "likerId"],
          include: {
            model: UserModel,
            attributes: ["id", "username", "email"],
          },
        },
        {
          model: TagModel, // Include the tags
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: UserModel, // Include the author
          as: "User",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Fetch the followers count for the author of the blog post
    const followersCount = await FollowModel.count({
      where: { followingId: blogPost.User.id },
    });

    // Construct the desired JSON structure
    const blogPostWithCategoriesAndComments = {
      id: blogPost.id,
      title: blogPost.title,
      content: blogPost.content,
      publicationDate: blogPost.publicationDate,
      createdAt: blogPost.createdAt,
      updatedAt: blogPost.updatedAt,
      author: {
        id: blogPost.User.id,
        username: blogPost.User.username,
        email: blogPost.User.email,
        followersCount, // Include the followers count
      },
      categories: blogPost.Categories.map((category) => ({
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        BlogPostCategory: category.BlogPostCategory,
      })),
      comments: blogPost.Comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        commenter: {
          id: comment.User.id,
          username: comment.User.username,
          email: comment.User.email,
        },
      })),
      likes: blogPost.Likes.map((like) => ({
        id: like.id,
        liker: {
          id: like.User.id,
          username: like.User.username,
          email: like.User.email,
        },
      })),
      tags: blogPost.Tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    };

    res.status(200).json(blogPostWithCategoriesAndComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching blog post" });
  }
};




const updateBlogPost = async (req, res) => {
  try {
    const blogPostId = req.params.id;
    const currentUser = req.user;

    const [updatedRows] = await BlogPostModel.update(req.body, {
      where: { id: blogPostId, authorId: currentUser.dataValues.id }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: 'Error updating blog post' });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blogPostId = req.params.id;
    const currentUser = req.user;

    const deletedRows = await BlogPostModel.destroy({
      where: { id: blogPostId, authorId: currentUser.dataValues.id }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: 'Error deleting blog post' });
  }
};

module.exports = {
  getAllBlogPosts,
  createBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
