var mysql = require('mysql');

var con = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

var dbConnection = function () { 
  con.connect(function(err) {
    if (err) { 
      throw err; 
    }
    console.log('database connected');
    
  });
};

exports.dbConnection = dbConnection;
exports.con = con;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".