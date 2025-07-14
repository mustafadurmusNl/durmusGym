// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const { loginUser } = require("../controllers/authController");
const { changePassword } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const {
  registrationValidationMiddleware,
} = require("../middleware/validationMiddleware");

router.post("/register", registrationValidationMiddleware, registerUser);
router.post("/login", loginUser); // Add this line
router.post("/change-password", authenticate, changePassword);
module.exports = router;
