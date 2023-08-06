// models/comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Comment.associate = models => {
      Comment.belongsTo(models.User, { foreignKey: 'commenterId' });
      Comment.belongsTo(models.BlogPost, { foreignKey: 'postId' });
    };
  
    return Comment;
};
