const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    projectId: "zpc5ty",
    baseUrl: 'https://marvel-qa-cademy.herokuapp.com'
  }
})