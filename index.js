const cdrScanning = require("./detector");
const cdrProcessing = require("./processing");
const cdrFtp2MD = require("./ftp2md");

//log action with level=debug
let msg = "[index.js] Reading config.json...";
logger("debug", msg);

const readConfig = require("./config");
const CONFIG = readConfig();

//log action with level=debug
msg = "[index.js] Reading config.json...done";
logger("debug", msg);

const main = async () => {
  let cdrFileList = new Map();
  console.log("Calling detector.js");
  cdrFileList = await cdrScanning();

  console.log("Calling processing.js");
  cdrNewFiles = await cdrProcessing(cdrFileList);

  console.log("Calling ftp2md.js");
  cdrFtpFiles = await cdrFtp2MD(cdrFileList);

  console.log("completed.");
};

let running = setInterval(main, CONFIG.interval);
