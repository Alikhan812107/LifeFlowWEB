const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { username, email },
    { new: true, runValidators: true }
  ).select("-password");

  res.json(user);
};
