const path = require("path");
const fs = require("fs");

const directoryPath = path.join(__dirname, "");

module.exports = cdrScanning = () => {
  let cdrList = new Map();

  files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    if (file.substr(file.length - 4, 4) === ".ACT") {
      if (file.substr(0, 4) === "new_") {
        cdrList.set(file.substr(4, file.length - 4), true);
      } else {
        cdrList.set(file, cdrList.has(file) ? true : false);
      }
    }
  });
  console.log(cdrList);
  return cdrList;
};
