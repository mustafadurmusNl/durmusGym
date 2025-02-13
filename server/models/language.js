const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  translations: {
    personalTraining: String,
    pilates: String,
    diet: String,
    about: String,
    method: String,
    contact: String,
    freeTrial: String,

    // ✅ Add Page Content Translations
    personalTrainingPage: {
      title: String,
      subtitle: String,
      description: String,
      freeTrialText: String,
      tryForFree: String,
      description2: String,
      description3: String,
      description4: String,
      name: String,
      email: String,
      phone: String,
      comments: String,
      placeholderName: String,
      placeholderEmail: String,
      placeholderPhone: String,
      placeholderComments: String,
      sendButton: String
    },
    pilatesPage: {
      title: String,
      subtitle: String,
      description: String,
      freeTrialText: String
    },
    aboutPage: {
      title: String,
      subtitle: String,
      description: String
    },
    contactPage: {
      title: String,
      subtitle: String,
      description: String
    },
    dietPage: {
      title: String,
      subtitle: String,
      description: String
    },
    methodPage: {
      title: String,
      subtitle: String,
      description: String
    }
  }
});

module.exports = mongoose.model("Language", LanguageSchema);
