const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false, // Her çalıştırmada önceki raporların üzerine yazılmaz.
    html: false, // HTML raporu otomatik oluşturulmaz.
    json: true, // JSON raporu oluşturulur.
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Node event listener
    },
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true,
    screenshotOnRunFailure: true,
  },
});
