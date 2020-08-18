const ftp = require("basic-ftp");
const fs = require("fs");
const logger = require("./logger");

const ftp2md = async (doneFlag, inputFile) => {
  let outputFile = "new_" + inputFile;
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
        host: "localhost",
        user: "cdr",
        password: "cdr",
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
  console.log(inputFilesList);

  inputFilesList.forEach(ftp2md);
};
