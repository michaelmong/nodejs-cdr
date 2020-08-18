const fs = require("fs");
const readline = require("readline");
const logger = require("./logger");

const processing = (doneFlag, inputFile) => {
  if (!doneFlag) {
    let outputFile = "new_" + inputFile;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(inputFile),
    });

    console.log("Start reading " + inputFile + "...");

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
      console.log("Reading " + inputFile + " completed.");

      fs.writeFile(outputFile, dataToNewFile, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log(outputFile, "has been saved.");
      });
    });
  }
};

module.exports = cdrProcessing = (inputFilesList) => {
  console.log(inputFilesList);

  inputFilesList.forEach(processing);
};
