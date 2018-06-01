var express = require("express");
var app = express(); 
var https = require('https');
var fs = require('fs');
var http = require('http');

var privateKey  = fs.readFileSync('privkey.pem', 'utf8');
var certificate = fs.readFileSync('fullchain.pem', 'utf8');
var https = require('https');

var credentials = {key: privateKey, cert: certificate};

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/', express.static('build'))

server = https.createServer(credentials, app);

server.listen(443, function(){
    console.log("server running at https://IP_ADDRESS:8001/")
});


// set up http redirect
var http = express.createServer();

// set up a route to redirect http to https
http.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
})

http.listen(80);
