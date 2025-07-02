const User = require("../models/User"); // Your Mongoose User model
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT token (or set cookie if using sessions)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 4. Send back token and user data
    res.json({
      token,
      user: {
        email: user.email,
        name: user.firstName + " " + user.lastName,
        isTempPassword: user.isTempPassword,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
//
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user was set in the authenticate middleware after token verification
    const userId = req.user.userId;

    // Fetch user from DB, exclude sensitive info like password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.json({ user });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
