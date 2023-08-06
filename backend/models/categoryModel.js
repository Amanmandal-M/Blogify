// models/category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Category.associate = models => {
      Category.belongsToMany(models.BlogPost, { through: 'PostCategory' });
    };
  
    return Category;
};
