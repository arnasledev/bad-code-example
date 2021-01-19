var fs = require("fs");
var path = require("path");
var { v4: uuidv4 } = require("uuid");

var uuidGenerator = function () {
  return uuidv4();
};

var date_generator = function () {
  return new Date();
};

function writeToDatabase({ database, data = {} }) {
  var pathToWrite = path.join(__dirname, "../mocks/" + database + ".json");
  var doesDatabase_exist = fs.existsSync(pathToWrite);

  if (!doesDatabase_exist) {
    throw new Error("Your selected database does not exist");
  }

  var stringifiedData = JSON.stringify(data);
  return fs.writeFileSync(pathToWrite, stringifiedData);
}

// you need to write a general method to read database content

module.exports = {
  uuidGenerator,
  date_generator,
  writeToDatabase: writeToDatabase,
};
