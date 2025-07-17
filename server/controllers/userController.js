const { createUser } = require("../services/userService");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const xss = require("xss"); // ✅ NEW: use for safe rendering

exports.registerUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      country,
      street,
      company,
      vatNumber,
      membershipType,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Attempted registration with existing email: ${email}`);
      return res.status(409).json({
        success: false,
        message:
          "This email is already registered. Please use a different email or log in.",
      });
    }

    const generatedPassword = crypto.randomBytes(4).toString("hex");

    const newUser = await createUser({
      email,
      firstName,
      lastName,
      country,
      street,
      company,
      vatNumber,
      membershipType,
      password: generatedPassword,
      isTempPassword: true,
    });

    const emailSent = await sendEmail({
      to: email,
      subject: "Welcome to DurmusGym!",
      text: `Hi ${firstName},\n\nThanks for signing up for the ${membershipType} plan.\nYour temporary password: ${generatedPassword}\nPlease log in and change it.\n\n- DurmusGym Team`,
    });

    return res.status(201).json({
      success: true,
      userId: newUser._id,
      message: `User registered${
        !emailSent ? ", but email failed to send" : " and email sent"
      }`,
      emailSent,
      // ✅ Escape values before rendering if needed
      safePreview: {
        firstName: xss(firstName),
        email: xss(email),
      },
    });
  } catch (err) {
    if (err.code === 11000 && err.keyValue && err.keyValue.email) {
      console.error("❌ Duplicate email:", err.keyValue.email);
      return res.status(409).json({
        success: false,
        message:
          "This email is already registered. Please use a different email or log in.",
      });
    }

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", ") || "Validation error during registration.",
      });
    }

    console.error("❌ Server error during registration:", err);
    return res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during registration.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { newPassword } = req.body;

    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Missing userId or new password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        isTempPassword: false,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Password updated for user:", updatedUser.email);
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Error updating password" });
  }
};
