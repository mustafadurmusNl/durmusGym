const express = require("express");
const Language = require("../models/language");

const router = express.Router();

// 📌 Add a New Language
router.post("/", async (req, res) => {
  try {
    const { code, name, translations } = req.body;
    const newLanguage = new Language({ code, name, translations });
    await newLanguage.save();
    res.status(201).json({ message: "✅ Language added successfully" });
  } catch (err) {
    res.status(500).json({ error: "❌ Error adding language", details: err.message });
  }
});

// 📌 Get All Languages
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ error: "❌ Error fetching languages" });
  }
});

// 📌 Get Language by Code (e.g., "en", "nl", "tr")
router.get("/:code", async (req, res) => {
  try {
    const language = await Language.findOne({ code: req.params.code });
    if (!language) return res.status(404).json({ message: "❌ Language not found" });
    res.json(language.translations);
  } catch (err) {
    res.status(500).json({ error: "❌ Error fetching language" });
  }
});

module.exports = router;
