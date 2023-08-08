const { TagModel } = require("../models/allModels");

const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const existingTag = await TagModel.findOne({
        where: { name },
    });
  
    if (existingTag) {
    return res.status(400).json({ error: "Tag has already present" });
    }

    // Create a new tag
    const newTag = await TagModel.create({
      name,
    });

    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Error creating tag" });
  }
};

const getAllTags = async (req, res) => {
  try {
    // Fetch all tags
    const tags = await TagModel.findAll();

    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Error fetching tags" });
  }
};

const getTagById = async (req, res) => {
  try {
    const tagId = req.params.id;

    // Fetch a tag by ID
    const tag = await TagModel.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Error fetching tag" });
  }
};

const updateTag = async (req, res) => {
  try {
    const tagId = req.params.id;
    const { name } = req.body;

    // Update the tag
    const updatedTag = await TagModel.update(
      { name },
      { where: { id: tagId } }
    );

    if (updatedTag[0] === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Error updating tag" });
  }
};

const deleteTag = async (req, res) => {
  try {
    const tagId = req.params.id;

    // Delete the tag
    const deletedRows = await TagModel.destroy({ where: { id: tagId } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Error deleting tag" });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
