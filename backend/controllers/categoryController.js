const { CategoryModel } = require("../models/allModels");

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await CategoryModel.create({ name });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const [updatedRows] = await CategoryModel.update({ name }, {
      where: { id: categoryId }
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedRows = await CategoryModel.destroy({
      where: { id: categoryId }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
