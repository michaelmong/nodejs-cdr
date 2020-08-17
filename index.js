const cdrScanning = require("./detector");
const cdrProcessing = require("./processing");

const main = async () => {
  let cdrFileList = new Map();
  cdrFileList = await cdrScanning();
  cdrNewFiles = await cdrProcessing(cdrFileList);
};

let running = setInterval(main, 5000);
