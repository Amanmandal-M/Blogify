// Define Sequelize models and their associations for the application.
const { Sequelize, DataTypes } = require("sequelize");
const { SeqConnection } = require("../configs/db");
const colors = require("colors");


// Each model represents a database table with specified attributes and relationships.
const UserModel = SeqConnection.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
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
});

const BlogPostModel = SeqConnection.define("BlogPost", {
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
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    },
    {
      timestamps: false // Disabling automatic timestamp fields (createdAt, updatedAt)
});

const CategoryModel = SeqConnection.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
});

const CommentModel = SeqConnection.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
});

const FollowModel = SeqConnection.define('Follow', {});

const LikeModel = SeqConnection.define('Like', {});

const TagModel = SeqConnection.define('Tag', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
});

const AdminModel = SeqConnection.define("Admin",{
      Name: {
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
});


// Associations link models together to represent the database structure.

// User
UserModel.hasMany(BlogPostModel, { foreignKey: 'authorId' });
UserModel.hasMany(CommentModel, { foreignKey: 'commenterId' });

// BlogPost
BlogPostModel.belongsTo(UserModel, { foreignKey: 'authorId' });
BlogPostModel.hasMany(CommentModel, { foreignKey: 'postId' }); 
BlogPostModel.belongsToMany(CategoryModel, { through: 'PostCategory' }); 
BlogPostModel.belongsToMany(TagModel, { through: 'PostTag' }); 
BlogPostModel.hasMany(LikeModel, { foreignKey: 'postId' }); 

// Category
CategoryModel.belongsToMany(BlogPostModel, { through: 'PostCategory' });

// Comment
CommentModel.belongsTo(UserModel, { foreignKey: 'commenterId' });
CommentModel.belongsTo(BlogPostModel, { foreignKey: 'postId' });

// Follow
FollowModel.belongsTo(UserModel, { foreignKey: 'followerId', as: 'follower' });
FollowModel.belongsTo(UserModel, { foreignKey: 'followingId', as: 'following' });

// Like
LikeModel.belongsTo(UserModel, { foreignKey: 'likerId' });
LikeModel.belongsTo(BlogPostModel, { foreignKey: 'postId' });

// Tag
TagModel.belongsToMany(BlogPostModel, { through: 'PostTag' });


// Sync the database schema to ensure models match the database structure.
const syncDatabase = async () => {
  try {
    await SeqConnection.sync();
    console.log(colors.green("Database synced successfully."));
  } catch (error) {
    console.error(colors.red("Error syncing database:", error));
  }
};

// syncDatabase();


// Export the defined models to be used throughout the application.
module.exports = { 
  UserModel, 
  BlogPostModel, 
  CategoryModel,
  CommentModel,
  FollowModel,
  LikeModel,
  TagModel,
  AdminModel
};