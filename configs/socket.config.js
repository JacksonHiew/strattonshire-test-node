const { io } = require("./server.config");

const Message = require("../models/message.model");
const roomName = "universalRoom";

io.on("connection", (socket) => {
  socket.join(roomName);

  Message.findAll((err, message) => {
    if (err) {
      throw err;
    }

    io.to(roomName).emit("initialized", message);
    return;
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

      io.to(roomName).emit("new-message-created", message);
      return;
    });
  });
});
