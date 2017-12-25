var db = require('../db');
var mysql = require('mysql');
// var moment = require('../../node_modules/moment/moment.js');

var insertMessagesTable = function (userid, roomid, text, callback) {
  var msgInsert = `INSERT INTO messages (userid, roomid, text) VALUES ('${userid}', '${roomid}', '${text}' )`;
  db.query(msgInsert, function(err, result) {
    if (err) { throw err; }
    console.log('1 msg inserted');
    callback(result);
  });
};

module.exports = {
  messages: {
    get: function (callback) {
      var messageList = [];
      var getAllMessages = 'SELECT * FROM messages, users, rooms WHERE messages.userid = users.userid AND messages.roomid = rooms.roomid;';
      db.query(getAllMessages, function(err, dataArray) {
        callback(dataArray);
      });

    }, // a function which produces all the messages
    post: function (parameter, callback) {

      //queries to check to see if username and roomname exist
      var checkUsername = `SELECT userid FROM users WHERE username = '${parameter[1]}'`;
      var checkRoom = `SELECT roomid FROM rooms WHERE roomname = '${parameter[2]}'`;

      //table insertions
      var roomInsert = `INSERT INTO rooms (roomname) VALUES ('${parameter[2]}')`;
      var userInsert = `INSERT INTO users (username) VALUES ('${parameter[1]}')`;

      //first check if user is in table
      db.query(checkUsername, function(err, result) {
        if (err) { throw err; }
        var userId;

        if (result.length) {
          userId = result[0].userid;

        //if user is not in table, insert user
        } else {
          db.query(userInsert, function(err, result) {
            if (err) { throw err; }
            console.log('1 user inserted');
            userId = result.insertId;
          });
        }

        //next check if room is in table
        db.query(checkRoom, function(err, result) {
          if (err) { throw err; }
          var roomId;

          if (result.length) {
            roomId = result[0].roomid;
            insertMessagesTable(userId, roomId, parameter[0], callback);
          //if room is not in table, insert room
          } else {
            db.query(roomInsert, function(err, result) {
              if (err) { throw err; }
              console.log('1 room inserted');
              roomId = result.insertId;
              insertMessagesTable(userId, roomId, parameter[0], callback);
            });
          }
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var userQuery = 'select * from users';
      db.query(userQuery, (err, result) => {
        callback(result);
      });
    },
    post: function (parameter, callback) {
      var addUserQuery = 'insert into users (username) values (?)';
      db.query(addUserQuery, parameter, (err, result) => {
        callback(result);
      });
    }
  }
};
