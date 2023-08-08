const { CommentModel } = require("../models/allModels");

const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.findAll();
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};

const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const currentUser = req.user; // Assuming you have middleware that adds the user to the request

    // Create the new comment
    const newComment = await CommentModel.create({
      text,
      commenterId: currentUser.dataValues.id,
      postId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await CommentModel.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Error fetching comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const currentUser = req.user;

    const [updatedRows] = await CommentModel.update(req.body, {
      where: { id: commentId, commenterId: currentUser.dataValues.id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Error updating comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const currentUser = req.user;

    const deletedRows = await CommentModel.destroy({
      where: { id: commentId, commenterId: currentUser.dataValues.id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
};
