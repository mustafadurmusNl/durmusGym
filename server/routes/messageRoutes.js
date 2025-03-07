const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const { signupMessage } = require("../controllers/messageController");
const router = express.Router();

router.post("/contact", sendMessage);
router.post("/signup", signupMessage);
module.exports = router;
