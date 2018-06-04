//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
var https = require("https");
var fs = require("fs");
var request = require("request");
require("dotenv").load();

var privateKey = fs.readFileSync("privkey.pem", "utf8");
var certificate = fs.readFileSync("fullchain.pem", "utf8");

var credentials = { key: privateKey, cert: certificate };

// Body Parser Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

var server = https.createServer(credentials, app);

server.listen(6069, function() {
  console.log("server running at https://IP_ADDRESS:8001/");
});

//Initiallising connection string
var dbConfig = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  server: process.env.DBSERVER,
  database: "justpostme-main",

  options: {
    encrypt: true
  }
};

var print;

//Function to connect to database and execute query
var executeQuery = function(res, query, f) {
  sql.connect(
    dbConfig,
    function(err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        res.send(err);
        sql.close();
      } else {
        // create Request object
        var request = new sql.Request();
        // query to the database
        request.query(query, function(err, qres) {
          if (err) {
            console.log("Error while querying database :- " + err);
            res.send(err);
          } else {
            res.send(qres);
          }
          sql.close();
        });
      }
    }
  );
};

var queryGet = function(res, query) {
  sql.connect(
    dbConfig,
    function(err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        //res.send(err);
        sql.close();
      } else {
        // create Request object
        var request = new sql.Request();
        // query to the database
        request.query(query, function(err, qres) {
          if (err) {
            console.log("Error while querying database :- " + err);
            //res.send(err);
          } else {
            res(qres);
          }
          sql.close();
        });
      }
    }
  );
};

var updatePages = function(res, userid, userAccessToken, response) {
  request(
    `https://graph.facebook.com/${userid}/accounts?access_token=${userAccessToken}`,
    function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        //console.log(body.data);
      }
      var data = body.data;
      var query = "DELETE FROM [pages] where userid = '" + userid + "';";

      if (data == null) {
        console.log("OH NO!!!\n");
        return;
      }
      for (var i = 0; i < data.length; i++) {
        query =
          query +
          "\nINSERT INTO [pages] (userid, scheduledPosts, pendingPosts, pageId, pageAccessToken, managed, name) VALUES (" +
          userid +
          ", 0, 0, " +
          data[i].id +
          " , '" +
          data[i].access_token +
          "', 0, '" +
          data[i].name +
          "');";
      }

      sql.close();
      console.log(query);
      executeQuery(res, query);
    }
  );
};

//GET API
app.get("/backend/user", function(req, res) {
  var query = "select * from [users]";
  executeQuery(res, query);
});

//GET API
app.get("/backend/managedpages", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE userid = '" +
    req.param("id") +
    "' AND managed=1";
  executeQuery(res, query);
});

//GET API
app.get("/backend/unmanagedpages", function(req, res) {
  var query =
    "SELECT * from [pages] WHERE userid = '" +
    req.param("id") +
    "' AND managed=0";
  executeQuery(res, query);
});

//GET API
app.get("/backend/page", function(req, res) {
  var query = "SELECT * from [pages] WHERE pageid = " + req.param("pageid");
  executeQuery(res, query);
});

//POST API
app.post("/backend/user", function(req, res) {
  var query =
    "DELETE FROM [users] where userid = '" +
    req.param("userid") +
    "';\n" +
    "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES ('" +
    req.param("userid") +
    "', '" +
    req.param("userAccessToken") +
    "' , '" +
    req.param("email") +
    "', '" +
    req.param("expiresIn") +
    "')";
  queryGet(
    response =>
      updatePages(
        res,
        req.param("userid"),
        req.param("userAccessToken"),
        response
      ),
    query
  );
});

//GET API
app.get("/backend/getpending", function(req, res) {
  var query =
    "SELECT * from [posts] WHERE pageid = '" + req.param("pageid") + "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/postit", function(req, res) {
  var query = "SELECT * from [posts] WHERE ID = " + req.param("postid") + ";";
  queryGet(
    response => postToFacebook(response, req.param("pageAccessToken")),
    query
  );
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

var postToFacebook = function(res, pageAccessToken) {
  pageId = res.recordset[0].pageid;
  postText = res.recordset[0].postText;

  console.log(
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`
  );

  request.post(
    `https://graph.facebook.com/${pageId}/feed?access_token=${pageAccessToken}&message=${postText}`,
    function(error, response, body) {
      body = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        //console.log(body.data);
      }
    }
  );
};

//POST API
app.post("/backend/newpost", function(req, res) {
  var query =
    "INSERT INTO [posts] (postid) VALUES ('" +
    req.param("userid") +
    "', '" +
    req.param("pageid") +
    "' , '" +
    req.param("postText") +
    "')";
  executeQuery(res, query);
});

//POST API
app.post("/backend/addtomanaged", function(req, res) {
  var query =
    "UPDATE [pages] SET managed = 1 WHERE pageId = '" +
    req.param("pageid") +
    "';";
  executeQuery(res, query);
});

//POST API
app.post("/backend/removefrommanaged", function(req, res) {
  var query =
    "UPDATE [pages] SET managed = 0 WHERE pageId = '" +
    req.param("pageid") +
    "';";
  executeQuery(res, query);
});
