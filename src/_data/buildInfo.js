const packageJson = require("../../package.json");

module.exports = function () {
  return {
    version: packageJson.version,
  };
};
