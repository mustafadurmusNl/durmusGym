const { createUser } = require("../services/userService");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const User = require("../models/User"); // Make sure to import your User model here

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

    // Check if user with this email already exists
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

    if (!emailSent) {
      return res.status(201).json({
        success: true,
        userId: newUser._id,
        message: "User registered, but email failed to send",
        emailSent: false,
      });
    }

    return res.status(201).json({
      success: true,
      userId: newUser._id,
      message: "User registered and email sent",
      emailSent: true,
    });
  } catch (err) {
    // This catches race conditions where two users register with the same email
    // at the exact same time, and the 'unique: true' index constraint is triggered.
    if (err.code === 11000 && err.keyValue && err.keyValue.email) {
      console.error(
        "❌ Race condition: Duplicate email caught by DB index",
        err.keyValue.email
      );
      return res.status(409).json({
        success: false,
        message:
          "This email is already registered. Please use a different email or log in.",
      });
    }

    // Handles Mongoose validation errors (e.g., missing required fields, invalid email format if defined in schema)
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      console.error(
        "❌ Registration failed: Mongoose Validation Error",
        errors
      );
      return res.status(400).json({
        success: false,
        message: errors.join(", ") || "Validation error during registration.",
      });
    }

    // Generic fallback for any other unexpected server errors
    console.error(
      "❌ An unexpected server error occurred during registration:",
      err
    );
    return res.status(500).json({
      success: false,
      message: "An unexpected server error occurred during registration.",
    });
  }
};

const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { newPassword } = req.body;

    // ✅ 1. Check required data
    if (!userId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Missing userId or new password" });
    }

    // ✅ 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ 3. Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        isTempPassword: false,
      },
      { new: true }
    );

    // ✅ 4. Handle not found case
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
