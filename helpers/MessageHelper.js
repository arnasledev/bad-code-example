var messages = require("../mocks/messages.json");

// there is a logic bug. you need to read json file contents every time you call a function.
var getLast_message = function (roomId) {
  var roomMessages = messages
    .map(function (message) {
      if (message.roomId === roomId) {
        return message;
      }

      return false;
    })
    .filter((v) => v);

  return roomMessages[roomMessages.length - 1];
};

module.exports = {
  getLast_message: getLast_message,
};
