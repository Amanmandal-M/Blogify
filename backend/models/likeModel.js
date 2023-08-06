// models/like.js
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {});
  
    Like.associate = models => {
      Like.belongsTo(models.User, { foreignKey: 'likerId' });
      Like.belongsTo(models.BlogPost, { foreignKey: 'postId' });
    };
  
    return Like;
};
