// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
// Her testten sonra çalışır
afterEach(function () {
  // Test başarılı ise screenshot al
  if (this.currentTest.state === "passed") {
    // Test ismini dosya adı yap → boşluk yerine alt çizgi
    const screenshotName = this.currentTest.title.replace(/\s+/g, "_");
    cy.screenshot(screenshotName);
  }
});
