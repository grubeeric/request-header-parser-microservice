var server = require("express");
var app = server();
var fs = require("fs");
var path = require("path");

var port = process.env.PORT || 3500;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});

app.get('/', function(req, res){
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function(err){
        if(err){
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/api/whoami', function(req, res){
    var myIP = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
    var operatingSystem = process.platform;
    
    res.json({
        ipaddress: myIP ,
        language: req.headers["accept-language"].split(',')[0] ,
        software: operatingSystem
    });
    
})