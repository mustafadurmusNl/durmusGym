const express = require("express");
const { sendMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/contact", sendMessage);

module.exports = router;
