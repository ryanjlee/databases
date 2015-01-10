var models = require('../models');
var bluebird = require('bluebird');
var mysql=require('mysql');


module.exports = {
  messages: {
    get: function (req, res) {

      var dbConnection = mysql.createConnection({
        user: "root",
        password: "password",
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

        //////////////////////////////////////////////////

        var dbConnection = mysql.createConnection({
          user: "root",
          password: "password",
          database: "chat"
        });
        dbConnection.connect();
        var queryString = "INSERT INTO chat.users (name) VALUES (\""+accumulator+"\") ";
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


      })


    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

      var dbConnection = mysql.createConnection({
        user: "root",
        password: "password",
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
    post: function (req, res) {}
  }
};

