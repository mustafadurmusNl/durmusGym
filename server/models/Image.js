const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  id: Number,
  alt: String,
  avg_color: String,
  height: Number,
  width: Number,
  liked: Boolean,
  photographer: String,
  photographer_id: Number,
  photographer_url: String,
  src: {
    original: String,
    large2x: String,
    large: String,
    medium: String,
    small: String,
    portrait: String,
    landscape: String,
    tiny: String,
  },
  url: String,
  category: String, // 👈 Add this line
}, { timestamps: true });

module.exports = mongoose.model("Image", ImageSchema);
