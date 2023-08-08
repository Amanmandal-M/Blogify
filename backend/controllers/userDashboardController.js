const { UserModel, BlogPostModel, LikeModel, TagModel, CategoryModel } = require("../models/allModels");

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using some form of authentication and have access to the user's ID

    // Fetch user information
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ["id", "username", "email"],
    });

    // Fetch user's blog posts
    const blogPosts = await BlogPostModel.findAll({
      where: { authorId: userId },
      attributes: ["id", "title", "publicationDate"],
    });

    // Fetch user's liked blog posts
    const likedBlogPosts = await BlogPostModel.findAll({
      include: [
        {
          model: LikeModel,
          where: { likerId: userId },
        },
      ],
      attributes: ["id", "title", "publicationDate"],
    });

    // Fetch user's tags
    const userTags = await TagModel.findAll({
      include: [
        {
          model: BlogPostModel,
          where: { authorId: userId },
        },
      ],
      attributes: ["id", "name"],
    });

    // Fetch user's categories
    const userCategories = await CategoryModel.findAll({
      include: [
        {
          model: BlogPostModel,
          where: { authorId: userId },
        },
      ],
      attributes: ["id", "name"],
    });

    res.status(200).json({
      user,
      blogPosts,
      likedBlogPosts,
      userTags,
      userCategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user dashboard" });
  }
};

module.exports = {
  getUserDashboard,
};
