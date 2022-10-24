const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    failOnStatusCode: false,
    // requestTimeout: 60000,
    // responseTimeout: 60000,
    // defaultCommandTimeout: 20000,
    retries: 1,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
