const fs = require("fs");
const readline = require("readline");
const logger = require("./logger");

//log action with level=debug
let msg = "[processing.js] Reading config.json...";
logger("debug", msg);

const readConfig = require("./config");
const CONFIG = readConfig();

//log action with level=debug
msg = "[processing.js] Reading config.json...done";
logger("debug", msg);

const processing = (doneFlag, inputFile) => {
  if (!doneFlag) {
    let outputFile = CONFIG.outputFile.prefix + inputFile;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(inputFile),
    });

    //log action with level=debug
    let msg = "[processing.js] Start reading " + inputFile + "...";
    logger("debug", msg);

    let lineNo = 0;
    let dataToNewFile = "";
    let inQuote = false;

    lineReader.on("line", (line) => {
      ++lineNo;
      for (let i = 0; i < line.length; i++) {
        if (line.charAt(i) === '"') {
          inQuote = !inQuote;
          dataToNewFile += line.charAt(i);
        } else {
          if (inQuote && line.charAt(i) === ",") {
            dataToNewFile += "_";
          } else {
            dataToNewFile += line.charAt(i);
          }
        }
      }
      dataToNewFile += "\n";
    });

    lineReader.on("close", () => {
      //log action with level=debug
      let msg =
        "[processing.js] Reading " +
        lineNo +
        " lines of " +
        inputFile +
        " finished";
      logger("debug", msg);

      fs.writeFile(outputFile, dataToNewFile, (err) => {
        if (err) {
          //log error with level=error
          let msg = "[processing.js] Error writing " + outputFile + ": " + err;
          logger("error", msg);

          return console.log(err);
        }
        //log action with level=debug
        let msg = "[processing.js] Writing " + outputFile + " success";
        logger("debug", msg);
      });
    });
  }
};

module.exports = cdrProcessing = (inputFilesList) => {
  inputFilesList.forEach(processing);
};
