const ftp = require("basic-ftp");
const fs = require("fs");
const logger = require("./logger");

//log action with level=debug
let msg = "[ftp2md.js] Reading config.json...";
logger("debug", msg);

const readConfig = require("./config");
const CONFIG = readConfig();

//log action with level=debug
msg = "[ftp2md.js] Reading config.json...done";
logger("debug", msg);

const ftp2md = async (doneFlag, inputFile) => {
  let outputFile = CONFIG.outputFile.prefix + inputFile;
  if (!doneFlag) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    const secureOptions = {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
      ca: [fs.readFileSync("cert.pem")],
      checkServerIdentity: () => {
        return null;
      },
    };
    try {
      await client.access({
        host: CONFIG.ftp.host,
        user: CONFIG.ftp.user,
        password: CONFIG.ftp.password,
        secure: true,
        secureOptions: secureOptions,
      });
      console.log(await client.list());
      await client.uploadFrom(outputFile, outputFile);

      //log report with level=info
      let msg = "[ftp2md.js] Upload " + outputFile + "completed";
      logger("info", msg);
    } catch (err) {
      //log error with level=error
      let msg = "[ftp2md.js] Error upload " + outputFile + ": " + err;
      logger("error", msg);
    }
    client.close();
  }
};

module.exports = cdrFtp2MD = (inputFilesList) => {
  inputFilesList.forEach(ftp2md);
};
