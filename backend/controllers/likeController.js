const { LikeModel, BlogPostModel, UserModel } = require("../models/allModels");

const getAllLikes = async (req, res) => {
  try {
    const likes = await LikeModel.findAll();
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Error fetching likes" });
  }
};

const createLike = async (req, res) => {
    try {
      const { likerId, postId } = req.body;
  
      // Check if both likerId and postId exist in the appropriate models
      const liker = await UserModel.findByPk(likerId);
      const post = await BlogPostModel.findByPk(postId);
  
      if (!liker || !post) {
        return res.status(404).json({ error: "Liker or post not found" });
      }
  
      // Check if the liker has already liked the post
      const existingLike = await LikeModel.findOne({
        where: { likerId, postId },
      });
  
      if (existingLike) {
        return res.status(400).json({ error: "User has already liked this post" });
      }
  
      // Create a new like
      const newLike = await LikeModel.create({
        likerId,
        postId,
      });
  
      res.status(201).json(newLike);
    } catch (error) {
      console.error("Error creating like:", error);
      res.status(500).json({ error: "Error creating like" });
    }
  };
  

const getLikeById = async (req, res) => {
  try {
    const likeId = req.params.id;
    const like = await LikeModel.findByPk(likeId);
    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.status(200).json(like);
  } catch (error) {
    console.error("Error fetching like:", error);
    res.status(500).json({ error: "Error fetching like" });
  }
};

const updateLike = async (req, res) => {
  try {
    const likeId = req.params.id;
    const updatedLike = await LikeModel.update(req.body, {
      where: { id: likeId },
    });
    if (updatedLike[0] === 0) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.status(200).json({ message: "Like updated successfully" });
  } catch (error) {
    console.error("Error updating like:", error);
    res.status(500).json({ error: "Error updating like" });
  }
};

const deleteLike = async (req, res) => {
  try {
    const likeId = req.params.id;
    const deletedRows = await LikeModel.destroy({
      where: { id: likeId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Error deleting like" });
  }
};

module.exports = {
  getAllLikes,
  createLike,
  getLikeById,
  updateLike,
  deleteLike,
};
