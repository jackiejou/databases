var Sequelize = require('sequelize');
var orm = new Sequelize('chat', 'root', '');

var Message = orm.define('Message', {
  text: Sequelize.STRING
});

var User = orm.define('User', {
  username: Sequelize.STRING
});

var Room = orm.define('Room', {
  roomname: Sequelize.STRING
});

Room.hasMany(Message);
User.hasMany(Message);
Message.belongsTo(Room);
Message.belongsTo(User);
User.sync();
Room.sync();
Message.sync();
exports.User = User;
exports.Room = Room;
exports.Message = Message;

//
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'chat'
// });
//
// con.on('error', function(err) {
//   console.log("[mysql error]", err);
// });
//
// con.connect();
//
// module.exports = con;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
