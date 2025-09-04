const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Event listener gerekirse buraya
    },
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3001",
    env: {
      BACKEND_URL: process.env.CYPRESS_BACKEND_URL || "http://localhost:5000",
    },
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    screenshotOnRunFailure: true,
  },
});
