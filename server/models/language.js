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
      description2: String,
      description3: String,
      description4: String,
      priceInfo: String,
      freeTrialText: String,
      tryForFree: String, // Added this field
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

    aboutPage: {
      title: String,
      subtitle: String,
      description: String,
      approachTitle: String,
      approachText: String,
      nutritionTitle: String,
      nutritionText: String,
      sweetsTitle: String,
      sweetsText: String,
      contactMe: String
    },

    contactPage: {
      title: String,
      subtitle: String,
      description: String,
      formTitle: String,
      name: String,
      email: String,
      phone: String,
      message: String,
      placeholderName: String,
      placeholderEmail: String,
      placeholderPhone: String,
      placeholderMessage: String,
      sendButton: String,
      whatsappText: String,
      whatsappButton: String,
      emailContact: String,
      phoneContact: String
    },

    dietPage: {
      title: String,
      subtitle: String,
      description: String,
      description2: String,
      description3: String,
      description4: String,
      formTitle: String,
      freeTrialText: String, // Added this field
      name: String,
      email: String,
      phone: String,
      placeholderName: String,
      placeholderEmail: String,
      placeholderPhone: String,
      sendButton: String
    },

    methodPage: {
      title: String,
      subtitle: String,
      description: String,
      steps: [
        {
          stepTitle: String,
          stepDescription: String
        }
      ]
    }
  }
});

module.exports = mongoose.model("Language", LanguageSchema);
