"use strict";
var dbConn = require("../configs/db.config");

//Message object create
var Message = function (user) {
  this.senderId = user.senderId;
  this.messageContent = user.messageContent;
  this.createdAt = new Date();
  this.updatedAt = new Date();
};

Message.create = (messageInfo, result) => {
  dbConn.query("INSERT INTO messages set ?", messageInfo, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

Message.findAll = (result) => {
  dbConn.query("Select * from messages", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = Message;
