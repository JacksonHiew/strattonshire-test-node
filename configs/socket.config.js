const { io } = require("./server.config");

const userController = require("../controllers/user.controller");
const messageController = require("../controllers/message.controller");

const Message = require("../models/message.model");
const User = require("../models/user.model");

io.on("connection", (socket) => {
  socket.on("user-connect", (user) => {
    User.create(new_user, (err, user) => {
      if (err) {
        throw err;
      }

      return {
        error: false,
        message: "User added successfully!",
        data: user,
      };
    });
  });

  socket.on("create-new-message", (message) => {
    const newMessage = new Message(message);

    Message.create(newMessage, (err, message) => {
      if (err) {
        throw err;
      }

      return {
        error: false,
        message: "Message added successfully!",
        data: message,
      };
    });

    Message.findAll((err, message) => {
      if (err) {
        throw err;
      }

      socket.emit("new-message-created", message);
      return;
    });
  });
});
