// models/blogpost.js
module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      publicationDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    BlogPost.associate = models => {
      BlogPost.belongsTo(models.User, { foreignKey: 'authorId' });
      BlogPost.hasMany(models.Comment, { foreignKey: 'postId' });
      BlogPost.belongsToMany(models.Category, { through: 'PostCategory' });
      BlogPost.belongsToMany(models.Tag, { through: 'PostTag' });
      BlogPost.hasMany(models.Like, { foreignKey: 'postId' });
    };
  
    return BlogPost;
};
