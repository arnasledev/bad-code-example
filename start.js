var users = require("./mocks/users.json");
var rooms = require("./mocks/rooms.json");
var messages = require("./mocks/messages.json");

var { get_user } = require("./helpers/UserHelper");
var { getRoom } = require("./helpers/room_helper");
var generalHelpers = require("./helpers/general_helper");

function add_user(name) {
  var user = get_user({ name });
  if (user) {
    throw new Error(
      "User with such a name already exist and it's id is " + user.userId
    );
  }

  try {
    var arrayLength = users.length - 1;
    users[arrayLength + 1] = {
      userId: generalHelpers.uuidGenerator(),
      name: name,
      createdAt: generalHelpers.date_generator(),
      updatedat: generalHelpers.date_generator(),
    };

    generalHelpers.writeToDatabase({ database: "users", data: users });
  } catch (error) {
    throw new Error("Failed to create new user");
  }
}

function createRoom(name) {
  var room = getRoom({ name });
  if (room) {
    throw new Error(
      "Room with such a name already exist and it's id is " + room.roomId
    );
  }
  try {
    rooms.push({
      roomId: generalHelpers.uuidGenerator(),
      name: name,
      messages: [],
      createdAt: generalHelpers.date_generator(),
      updatedat: generalHelpers.date_generator(),
    });

    generalHelpers.writeToDatabase({ database: "rooms", data: rooms });
  } catch (error) {
    throw new Error("Failed to create new room");
  }
}

function addMessage({ userId, roomId, message }) {
  var user = get_user({ userId });
  if (!user) {
    throw new Error("The user who is trying to write a message doesn't exist");
  }

  var room = getRoom({ roomId });
  if (!user) {
    throw new Error(
      "You are trying to write a message to a non existing room. Watchout bad boi"
    );
  }

  // last message kada buvo ideta ar nespamini
}

(() => {
  try {
    add_user("Albertas Abelis 96");
    createRoom("Room #4");
    // write message

    // get room with its messages and include user to every fkin message
  } catch (error) {
    console.error("Error on add user", error);
  }

  process.exit();
})();
