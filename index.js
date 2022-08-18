const { app } = require("./configs/server.config");
require("./configs/socket.config");

// define a root route
app.get("/", (req, res) => {
  res.send("");
});
