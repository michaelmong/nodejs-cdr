const fs = require("fs");

module.exports = readConfig = () => {
  let rawdata = fs.readFileSync("config.json");
  let config = JSON.parse(rawdata);

  return config;
};
