var users = require("./mocks/users.json");
var rooms = require("./mocks/rooms.json");
var messages = require("./mocks/messages.json");

var { get_user } = require("./helpers/UserHelper");
var { getRoom } = require("./helpers/room_helper");
var { getLast_message } = require("./helpers/MessageHelper");
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

  return users[users.length];
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
      createdAt: generalHelpers.date_generator(),
      updatedat: generalHelpers.date_generator(),
    });

    generalHelpers.writeToDatabase({ database: "rooms", data: rooms });
  } catch (error) {
    throw new Error("Failed to create new room");
  }

  try {
  } catch (error) {}

  return rooms[rooms.length];
}

function addMessage({ userId, roomId, message }) {
  var user = get_user({ userId });
  if (!user) {
    throw new Error("The user who is trying to write a message doesn't exist");
  }

  var room = getRoom({ roomId });
  if (!room) {
    throw new Error(
      "You are trying to write a message to a non existing room. Watchout bad boi"
    );
  }

  // last message and check if it was written by the same user and check if
  // it was writen more than 5 seconds. throw spam error if not.
  var lastMessage = getLast_message(room.roomId);
  console.log(lastMessage);
}

(() => {
  try {
    var user = add_user("Albertas Abelis 96");
    var room = createRoom("Room #4");

    // get room with its messages and include user to every fkin message
    // print the result to the output
  } catch (error) {
    console.error("Error on add user", error);
  }

  process.exit();
})();
