//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

var accessToken = ''
		var uid = ''
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '2207425962822702',
		      xfbml      : true,
		      version    : 'v3.0'
		    });
		    FB.getLoginStatus(function(response) {
		    	if (response.status === 'connected') {
		    		document.getElementById('status').innerHTML = 'We are connected.';
		    		document.getElementById('login').style.visibility = 'hidden';
		    	} else if (response.status === 'not_authorized') {
		    		document.getElementById('status').innerHTML = 'We are not logged in.'
		    	} else {
		    		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
		    	}
		    });
		};
		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));


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
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,email,location,id'}, function(response) {
        console.log(response.email);
    });
}

//GET API
app.get("/backend/user", function(req , res){
                var query = "select * from [users]";
                executeQuery (res, query);
});

//GET API
app.get("/backend/managedpages/:id", function(req , res){
    var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=1";
    executeQuery (res, query);
});

//POST API
app.post("/backend/user", function(req , res){
                var query = "INSERT INTO [users] (userid, userAccessToken, email, expiresIn) VALUES ('" + req.param('userid') + "', '" + req.param('userAccessToken') + "' , '"+ req.param('email')  + "', '" + req.param('expiresIn') + "')";
                executeQuery (res, query);
                //updatePages (res, req.param('userid'), req.param('userAccessToken'));
});

//POST API
app.post("/backend/user/managed/:id", function(req , res){
    var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=1";
    executeQuery (res, query);
});

//POST API
app.post("/backend/user/unmanaged/:id", function(req , res){
    var query = "SELECT * from [pages] WHERE userid = " + req.param("id") + " AND managed=0";
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