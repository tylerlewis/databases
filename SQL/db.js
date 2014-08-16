var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  var queryString = 'SELECT * FROM messages;';
  dbConnection.query(queryString, function(err, messages) {
    if(err) {
      throw err;
    }
    cb(err, messages);
  });
};

exports.findUser = function(username, cb){
  var queryString = 'SELECT * FROM users WHERE username = ' + JSON.stringify(username) + ';';
  console.log("FIND USER");
  dbConnection.query(queryString, function(err, user) {
    if(err) {
      throw err;
    }
    cb(err, user);
  });
};

exports.saveUser = function(username, cb){
  var queryString = 'INSERT INTO users (username) values(' + JSON.stringify(username) + ');';
  console.log("SAVE USER");
  dbConnection.query(queryString, function(err, user) {
    if(err) {
      throw err;
    }
    cb(user);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var queryString = 'INSERT INTO messages (userId, txt, roomname) values(' + JSON.stringify(userid) + ', ' + JSON.stringify(message) + ', ' + JSON.stringify(roomname) + ');';
  console.log("ASSHOLE STRING: ", queryString);
  dbConnection.query(queryString, function(err, message) {
    if(err) {
      throw err;
    }
    cb(message);
  });
};
