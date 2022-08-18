const { io } = require("./server.config");

const userController = require("../controllers/user.controller");
const messageController = require("../controllers/message.controller");

io.on("connection", (socket) => {
  socket.on("user-connect", (user) => {
    userController.create({
      body: user,
    });
  });

  socket.on("create-new-message", (message) => {
    messageController.create({
      body: message,
    });

    const allMessages = messageController.findAll();

    console.log(allMessages);

    socket.emit("new-message-created", allMessages);
  });
});
