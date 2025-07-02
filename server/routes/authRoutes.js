const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const { getCurrentUser } = require("../controllers/authController"); // or userController

router.post("/login", loginUser);
router.get("/me", authenticate, getCurrentUser);
module.exports = router;
