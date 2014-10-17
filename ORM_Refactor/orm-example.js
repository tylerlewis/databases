/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "", {host: '127.0.0.1', port: 3000});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */
exports.auth = function() {
  sequelize.authenticate().complete(function(err) {
    if(err) {
      console.log("Error: ", err);
    }
    console.log("Database authenticated.");
  });
};
/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  //userId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  username: Sequelize.STRING
});

var Message = sequelize.define('messages', {
  txt: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
exports.findUser = User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

exports.findMessages = Message.sync().success(function() {
  var newMessage = Message.build({txt: "In mercy's name, three days is all I need.", roomname: "Hello"});
  newMessage.save().success(function() {
    Message.findAll().success(function(msgs) {
      for(var i = 0; i < msgs.length; i++) {
        console.log(msgs[i] + " exists");
      }
    });
  });
});
