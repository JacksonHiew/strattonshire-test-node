"use strict";
const Message = require("../models/message.model");

exports.findAll = (req) => {
  Message.findAll((err, message) => {
    if (err) {
      result = err;
      throw err;
    }

    result = message;
    return message;
  });

  return result;
};

exports.create = (req) => {
  const newMessage = new Message(req.body);

  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw {
      error: true,
      message: "Please provide all required field",
    };
  } else {
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
  }
};
