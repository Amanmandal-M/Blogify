// models/follow.js
module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {});
  
    Follow.associate = models => {
      Follow.belongsTo(models.User, { foreignKey: 'followerId', as: 'follower' });
      Follow.belongsTo(models.User, { foreignKey: 'followingId', as: 'following' });
    };
  
    return Follow;
};
