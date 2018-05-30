//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

require('dotenv').config();
require('dotenv').load();

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port, process.env.USERNAME);
});

//Initiallising connection string
var dbConfig = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,

    options: {
        encrypt: true
    }
};

//Function to connect to database and execute query
var  executeQuery = function(res, query) {      
     sql.connect(dbConfig, function (err) {
         if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
            sql.close();
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, qres) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(qres);
                }
                sql.close();
            });
        }
    }); 
}

//GET API
app.get("/backend/user", function(req , res){
                var query = "select * from [users]";
                executeQuery (res, query);
});

//POST API
app.post("/backend/user", function(req , res){
                var query = "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES (" + req.param('userid') + ", " + req.param('userAccessToken') + " , "+ req.param('email')  + ", " + req.param('expiresIn') + ")";
                executeQuery (res, query);
});

/*
//PUT API
 app.put("/backend/user/:id", function(req , res){
                var query = "UPDATE users SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});
*/

/*
// DELETE API
 app.delete("/backend/user /:id", function(req , res){
                var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
                executeQuery (res, query);
});
*/