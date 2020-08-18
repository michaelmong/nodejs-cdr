const cdrScanning = require("./detector");
const cdrProcessing = require("./processing");
const cdrFtp2MD = require("./ftp2md");

const main = async () => {
  let cdrFileList = new Map();
  cdrFileList = await cdrScanning();
  cdrNewFiles = await cdrProcessing(cdrFileList);
  cdrFtpFiles = await cdrFtp2MD(cdrFileList);
};

let running = setInterval(main, 5000);
