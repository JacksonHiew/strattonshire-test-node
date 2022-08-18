"use strict";
var dbConn = require("./../configs/db.config");

//User object create
var User = function (user) {
  this.userId = user.userId;
  this.username = user.username;
  this.updatedAt = new Date();
  this.createdAt = new Date();
};

User.create = (userInfo, result) => {
  setTimeout(() => {
    dbConn.query("INSERT INTO users set ?", userInfo, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  }, 5000);
};

User.findById = (id, result) => {
  dbConn.query("Select * from users where id = ? ", id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = (result) => {
  dbConn.query("Select * from users", (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

User.update = (id, user, result) => {
  dbConn.query(
    "UPDATE users SET userId=?,username=?,updatedAt=? WHERE id = ?",
    [user.userId, user.username, user.updatedAt],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = (id, result) => {
  dbConn.query("DELETE FROM users WHERE userId = ?", [id], (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
