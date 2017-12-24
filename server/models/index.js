var db = require('../db');
var mysql = require('mysql');
var moment = require('../../node_modules/moment/moment.js');

var insertMessagesTable = function (userid, roomid, text, date) {
  console.log('DATE=======', date);
  var msgInsert = `INSERT INTO messages (userid, roomid, text, createdAt) VALUES ('${userid}', '${roomid}', '${text}', '${date}' )`;
  db.con.query(msgInsert, function(err, result) {
    if (err) { throw err; }
    console.log('1 msg inserted');
  });
};

module.exports = {
  messages: {
    get: function () {

    }, // a function which produces all the messages
    post: function (data) {


      console.log('data in models', data);
      var date = new Date();

      //queries to check to see if username and roomname exist
      var checkUsername = `SELECT userid FROM users WHERE username = '${data.username}'`;
      var checkRoom = `SELECT roomid FROM rooms WHERE roomname = '${data.roomname}'`;

      //table insertions
      var roomInsert = `INSERT INTO rooms (roomname) VALUES ('${data.roomname}')`;
      var userInsert = `INSERT INTO users (username) VALUES ('${data.username}')`;

      //first check if user is in table
      db.con.query(checkUsername, function(err, result) {
        if (err) { throw err; }
        let userId;

        if (result.length) {
          userId = result[0].userid;

        //if user is not in table, insert user
        } else {
          db.con.query(userInsert, function(err, result) {
            if (err) { throw err; }
            console.log('1 user inserted');
            userId = result.insertId;
            // db.con.query(checkUsername, function(err, result) {
            //   if (err) {throw err;}
            //   userId = result[0].userid;
            // });
          });
        }
        //user is definitely in table, query for user's userid



        //next check if room is in table
        db.con.query(checkRoom, function(err, result) {
          if (err) { throw err; }
          let roomId;

          if (result.length) {
            roomId = result[0].roomid;
            insertMessagesTable(userId, roomId, data.text, data.createdAt);

          //if room is not in table, insert room
          } else {
            db.con.query(roomInsert, function(err, result) {
              if (err) { throw err; }
              console.log('1 room inserted');
              roomId = result.insertId;
              insertMessagesTable(userId, roomId, data.text, data.createdAt);
              // db.con.query(checkRoom, function(err, result) {
              //   if (err) {throw err;}
              //   roomId = result[0].roomid;
              // });
            });
          }

        // console.log('checkRoom ', result[0].userid);
        });



      // db.con.query(roomSql, function(err, result) {
      //   if (err) {throw err;}
      //   console.log('1 room inserted');
      // });
      
      // db.con.query(userSql, function(err, result) {
      //   if (err) {throw err;}
      //   console.log('1 user inserted');
      // }); 

      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};