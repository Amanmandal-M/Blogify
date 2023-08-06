const { Sequelize, DataTypes } = require("sequelize");
const { SeqConnection } = require("../configs/db");

const UserModel = SeqConnection.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  }
);

UserModel.associate = models => {
  UserModel.hasMany(models.BlogPost, { foreignKey: 'authorId' });
  UserModel.hasMany(models.Comment, { foreignKey: 'commenterId' });
};

module.exports = { UserModel };