var models = require("../models");
var bluebird = require("bluebird");
var mysql=require("mysql");


module.exports = {
  messages: {
    get: function (req, res) {

      var dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "chat"
      });
      dbConnection.connect();
      var queryString = "SELECT * FROM chat.messages";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err){
          res.end(err);
          dbConnection.end();
          return;
        }
        res.end(JSON.stringify(results));
        dbConnection.end();
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {

      var accumulator="";
      req.on("data",function(chunk){
        accumulator+=chunk;
      });
      req.on("end",function(){
        accumulator=JSON.parse(accumulator);
        accumulator.username=accumulator.username || "anonymous";
        accumulator.roomname=accumulator.roomname || "lobby";
        //////////////////////////////////////////////////

        var dbConnection = mysql.createConnection({
          user: "root",
          password: "",
          database: "chat",
          multipleStatements: true
        });
        dbConnection.connect();
        var queryString ="";
        queryString+="INSERT IGNORE INTO chat.users (name) VALUES (\""+accumulator.username+"\") ; ";
        queryString+="INSERT IGNORE INTO chat.rooms (name) VALUES (\""+accumulator.roomname+"\") ; ";
        queryString+="INSERT INTO chat.messages (text,user_id,room_id) VALUES (\""+accumulator.text+"\", (SELECT id FROM chat.users WHERE name = \""+accumulator.username+"\"), (SELECT id FROM chat.rooms WHERE name = \""+accumulator.roomname+"\" ) ) ;";

        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          if (err){
            res.end(err);
            dbConnection.end();
            return;
          }
          res.end(JSON.stringify(results));
          dbConnection.end();
        });

        ////////////////////////////////////////////////////


      });


    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      var dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "chat"
      });
      dbConnection.connect();
      var queryString = "SELECT * FROM chat.users";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err){
          res.end(err);
          dbConnection.end();
          return;
        }
        res.end(JSON.stringify(results));
        dbConnection.end();
      });

    },
    post: function (req, res) {

      var accumulator="";
      req.on("data",function(chunk){
        accumulator+=chunk;
      });
      req.on("end",function(){
        accumulator=JSON.parse(accumulator);

        //////////////////////////////////////////////////

        var dbConnection = mysql.createConnection({
          user: "root",
          password: "",
          database: "chat"
        });
        dbConnection.connect();
        var queryString = "INSERT INTO chat.users (name) VALUES (\""+accumulator.username+"\") ";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          if (err){
            res.end(err);
            dbConnection.end();
            return;
          }
          res.end(JSON.stringify(results.insertId));
          dbConnection.end();
        });

        ////////////////////////////////////////////////////

      });
    }
  }
};

