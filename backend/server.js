//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

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
 var server = app.listen(process.env.PORT || 6069, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user: "mhutti1",
    password: "D72my5!eysG@z@{'",
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

//GET API
app.get("/backend/user", function(req , res){
                var query = "select * from [users]";
                executeQuery (res, query);
});

//POST API
app.post("/backend/user", function(req , res){
                var query = "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES (" + parseInt(req.param('userid')) + ", " + parseInt(req.param('userAccessToken')) + " , '"+ req.param('email')  + "', " + parseInt(req.param('expiresIn')) + ")";
                executeQuery (res, query);
});

//POST API
app.get("/backend/managedpages/:id", function(req , res){
                var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=1";
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