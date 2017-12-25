var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include:[db.User]})
        .then(results => {
          res.json(results);
        });
      // models.messages.get((err, results) => {
      //   if (err) throw err;
      //   res.json(results);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .spread(function(user, created) {
          db.Room.findOrCreate({where: {roomname: req.body.roomname}})
            .spread(function(room, created) {
              db.Message.create({
                userid: user.get('id'),
                text: req.body.message,
                roomname: room.get('id')
              }).then(function(message) {
                res.sendStatus(201);
              });
            });
        });
      // var parameter = [req.body[text], req.body[username], req.body[roomname]];
      // models.messages.post(parameter, (err, results) => {
      //   res.json(results);
      // });
      // var content = '';
      // req.on('data', function (data) {
      //   // Append data.
      //   content += data;
      // });
      // req.on('end', function (data) {
      //   // Assuming, we're receiving JSON, parse the string into a JSON object to return.
      //   var data = JSON.parse(content);
      //   models.messages.post(data, res, headers);
      // });

      // store in database
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.User.findAll()
        .then((err, results) => {
          res.json(results);
        });
      // models.users.get((err, results) => {
      //   if (err) throw err;
      //   res.json(results);
      // });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
      // findOrCreate returns [{message}, created Boolean]
        .spread((user, created) => {
          res.sendStatus(201);
        });
      // var parameter = [req.body[username]];
      // models.users.post(parameter, (err, results) => {
      //   res.json(results);
      // });
    }
  }
};
