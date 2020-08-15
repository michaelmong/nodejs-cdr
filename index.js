const inputFile = "CDR4Test.ACT";
const outputFile = "new_CDR4Test.ACT";

const fs = require("fs");
const readline = require("readline");

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
