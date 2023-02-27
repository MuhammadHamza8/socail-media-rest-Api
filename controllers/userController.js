const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({message:"Account has been updated"});
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({message:"You can update only your account!"});
  }
};

exports.deleteUser =async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"Account has been deleted"});
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({message:"You can delete only your account!"});
  }
};

exports.getUser =async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.followUser =async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({message:"user has been followed"});
      } else {
        res.status(403).json({message:"you allready follow this user"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

exports.unfollowUser =async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({message:"user has been unfollowed"});
      } else {
        res.status(403).json({message:"you dont follow this user"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({message:"you cant unfollow yourself"});
  }
};