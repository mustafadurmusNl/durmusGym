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

    homePage: {
      intro: {
        title: String,
        button: String
      },
      personalApproach: {
        title: String,
        description: String,
        button: String
      },
      options: {
        personalTraining: {
          title: String,
          privateGym: String,
          customSchedules: String,
          personalCoach: String,
          nutritionalGuidance: String,
          tailoredSessions: String,
          moreInfo: String // Added here
        },
        duoTraining: {
          title: String,
          privateGym: String,
          customSchedules: String,
          personalCoach: String,
          nutritionalGuidance: String,
          tailoredSessions: String,
          moreInfo: String // Added here
        },
        pilates: {
          title: String,
          studioLocation: String,
          flexibilityBalancePosture: String,
          certifiedCoach: String,
          privateOrGroupOptions: String,
          moreInfo: String // Added here
        }
      },
      signup: {
        title: String,
        description1: String,
        description2: String,
        namePlaceholder: String,
        emailPlaceholder: String,
        phonePlaceholder: String,
        messagePlaceholder: String,
        sendButton: String,
        whatsappButton: String
      }
    },

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
      tryForFree: String,
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

    dietPage: {
      title: String,
      subtitle: String,
      description: String,
      description2: String,
      description3: String,
      description4: String,
      formTitle: String,
      freeTrialText: String,
      name: String,
      email: String,
      phone: String,
      placeholderName: String,
      placeholderEmail: String,
      placeholderPhone: String,
      sendButton: String
    },

    aboutPage: {
      title: String,
      welcomeMessage: String,
      approach: String,
      trainingMethods: String,
      nutritionFocus: String,
      homemadeSweets: String,
      fitnessGoalSupport: String,
      contactButton: String
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
    }
  }
});

module.exports = mongoose.model("Language", LanguageSchema);
