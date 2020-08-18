const ftp = require("basic-ftp");
const fs = require("fs");
const logger = require("./logger");

const ftp2md = async (doneFlag, inputFile) => {
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
      await client.uploadFrom("new_" + inputFile, "new_" + inputFile);
    } catch (err) {
      logger("error", err);
    }
    client.close();
  }
};

module.exports = cdrFtp2MD = (inputFilesList) => {
  console.log(inputFilesList);

  inputFilesList.forEach(ftp2md);
};
