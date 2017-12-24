var models = require('../models');
var db = require('../db');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res, headers);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var content = '';
      req.on('data', function (data) {
        // Append data.
        content += data;
      });
      req.on('end', function (data) {
        // Assuming, we're receiving JSON, parse the string into a JSON object to return.
        var data = JSON.parse(content);
        models.messages.post(data, res, headers);
      });


      // store in database
    }, // a function which handles posting a message to the database
    options: function (req, res) {
      //do things with headers
      res.writeHead(200, headers);  
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {},
    options: function (req, res) {}
  }
};

