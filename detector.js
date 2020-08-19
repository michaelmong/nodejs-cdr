const path = require("path");
const fs = require("fs");
const logger = require("./logger");

//log action with level=debug
let msg = "[detector.js] Reading config.json...";
logger("debug", msg);

const readConfig = require("./config");
const CONFIG = readConfig();

//log action with level=debug
msg = "[detector.js] Reading config.json...done";
logger("debug", msg);

const directoryPath = path.join(__dirname, CONFIG.inputFile.path);

module.exports = cdrScanning = () => {
  let cdrList = new Map();

  files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (
      file.substr(
        file.length - CONFIG.inputFile.ext.length,
        CONFIG.inputFile.ext.length
      ) === CONFIG.inputFile.ext
    ) {
      if (
        file.substr(0, CONFIG.outputFile.prefix.length) ===
        CONFIG.outputFile.prefix
      ) {
        cdrList.set(
          file.substr(CONFIG.outputFile.prefix.length, file.length),
          true
        );
      } else {
        cdrList.set(file, cdrList.has(file) ? true : false);
      }
    }
  });

  //log filename with level=info
  cdrList.forEach((exist, filename) => {
    let msg =
      "[detector.js] { File:" +
      filename +
      (exist ? ", detected and already processed }" : ", queued to process }");
    logger("info", msg);
  });

  return cdrList;
};
