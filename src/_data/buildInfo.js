const packageJson = require("../../package.json");

module.exports = function () {
  return {
    environment: process.env.SENTRY_ENV,
    version: packageJson.version,
  };
};
