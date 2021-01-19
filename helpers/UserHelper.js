var users = require("../mocks/users.json");

// there is a logic bug. you need to read json file contents every time you call a function.
var get_user = function ({ name = false, userId = false }) {
  if (!name && !userId) {
    throw new Error(
      "You must specify user name or user id in order to find a room"
    );
  }

  var user_found = false;
  users.forEach(function (user, arrayKey) {
    if (user.name === name || user.userId === userId) {
      user_found = users[arrayKey];
    }
  });

  if (user_found) {
    return user_found;
  }

  return false;
};

module.exports = {
  get_user: get_user,
};
