const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api.clickup.com/api/v2",

    setupNodeEvents(on, config) {
      config.env.token = process.env.CLICKUP_TOKEN;
      config.env.teamId = process.env.TEAM_ID;

      return config;
    },
  },
});

