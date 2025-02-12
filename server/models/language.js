const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g., "en", "nl", "tr"
  name: { type: String, required: true }, // e.g., "English", "Nederlands", "Türkçe"
  translations: { type: Object, required: true } // Store translated words
});

module.exports = mongoose.model("Language", LanguageSchema);
