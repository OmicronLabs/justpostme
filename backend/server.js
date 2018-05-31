//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
var https = require('https');
var fs = require('fs');


var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var request = require('request');


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


var server = https.createServer(credentials, app);

server.listen(6069, function(){
    console.log("server running at https://IP_ADDRESS:8001/")
});

//Initiallising connection string
var dbConfig = {
    user: "mhutti1",
    password: "T6Bcy2MJ+Gm^9SF-",
    server: "mhutti1.database.windows.net",
    database: "justpostme-main",

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

var updatePages = function(res, userid, userAccessToken) {
    request(`https://graph.facebook.com/${userid}/accounts?access_token=${userAccessToken}`, function (error, response, body) {
        body = JSON.parse(body);    
        if (!error && response.statusCode == 200) {
            //console.log(body.data);
        }
        var data = body.data;
        var query = "";
        for(var i = 0; i < data.length; i++) {
            query = query + "INSERT INTO [pages] (userid, scheduledPosts, pendingPosts, pageId, pageAccessToken, managed, name) VALUES (" + userid + ", 0, 0, " + data[i].id + " , '" + data[i].access_token  + "', 0, '" + data[i].name + "')\n";
        }
        sql.close();
        executeQuery (res, query);

    });
}

//GET API
app.get("/backend/user", function(req , res){
                var query = "select * from [users]";
                executeQuery (res, query);
});

//GET API
app.get("/backend/managedpages", function(req , res){
    var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=1";
    executeQuery (res, query);
});

//GET API
app.get("/backend/unmanagedpages", function(req , res){
    var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=0";
    executeQuery (res, query);
});

//POST API
app.post("/backend/user", function(req , res){
                var query = "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES ('" + req.param('userid') + "', '" + req.param('userAccessToken') + "' , '"+ req.param('email')  + "', '" + req.param('expiresIn') + "')";
                executeQuery (res, query);
                updatePages (res, req.param('userid'), req.param('userAccessToken'));
});

//POST API
app.post("/backend/post:id", function(req , res){
    var query = "INSERT INTO [posts] (userid, pageid, postText) VALUES ('" + req.param('userid') + "', '" + req.param('pageid') + "' , '" + req.param('postText') + "')";
    executeQuery (res, query);
    updatePages (res, req.param('userid'), req.param('userAccessToken'));
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
