var rooms = require("../mocks/rooms.json");

module.exports = {
  // there is a logic bug. you need to read json file contents every time you call a function.
  getRoom: function ({ name = false, roomId = false }) {
    if (!name && !roomId) {
      throw new Error(
        "You must specify room name or room id in order to find a room"
      );
    }

    var room = false;
    for (var i = 0; i <= rooms.length - 1; i++) {
      if (rooms[i].name === name || rooms[i].roomId === roomId) {
        room = rooms[i];
      }
    }

    return room;
  },
};
