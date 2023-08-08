const { FollowModel, UserModel } = require("../models/allModels");

const getAllFollows = async (req, res) => {
  try {
    const follows = await FollowModel.findAll();
    res.status(200).json(follows);
  } catch (error) {
    console.error("Error fetching follows:", error);
    res.status(500).json({ error: "Error fetching follows" });
  }
};

const createFollow = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Check if both followerId and followingId exist in the User model
    const follower = await UserModel.findByPk(followerId);
    const following = await UserModel.findByPk(followingId);

    if (!follower || !following) {
      return res.status(404).json({ error: "Follower or following user not found" });
    }

    // Check if the follow relationship already exists
    const existingFollow = await FollowModel.findOne({
      where: { followerId, followingId },
    });

    if (existingFollow) {
      return res.status(409).json({ error: "User is already following this user" });
    }

    const newFollow = await FollowModel.create({
      followerId,
      followingId,
    });

    res.status(201).json(newFollow);
  } catch (error) {
    console.error("Error creating follow:", error);
    res.status(500).json({ error: "Error creating follow" });
  }
};


const getFollowById = async (req, res) => {
  try {
    const followId = req.params.id;
    const follow = await FollowModel.findByPk(followId);
    
    if (!follow) {
      return res.status(404).json({ error: "Follow not found" });
    }

    res.status(200).json(follow);
  } catch (error) {
    console.error("Error fetching follow:", error);
    res.status(500).json({ error: "Error fetching follow" });
  }
};

const deleteFollow = async (req, res) => {
    try {
      const followId = req.params.id;
      const currentUser = req.user;
      const follow = await FollowModel.findByPk(followId);
  
      if (!follow) {
        return res.status(404).json({ error: "Follow not found" });
      }
  
      // Check if the current user is the follower or following in this follow entry
      if (follow.followerId !== currentUser.dataValues.id && follow.followingId !== currentUser.dataValues.id) {
        return res.status(403).json({ error: "You are not authorized to delete this follow" });
      }
  
      await follow.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting follow:", error);
      res.status(500).json({ error: "Error deleting follow" });
    }
  };
  

module.exports = {
  getAllFollows,
  createFollow,
  getFollowById,
  deleteFollow,
};
