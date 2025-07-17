// server/models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String },
  category: { type: String }, // e.g., "pilates", "diet", etc.
});

module.exports = mongoose.model("Video", videoSchema);
