// models/tag.js
module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Tag.associate = models => {
      Tag.belongsToMany(models.BlogPost, { through: 'PostTag' });
    };
  
    return Tag;
};
