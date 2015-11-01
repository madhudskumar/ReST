var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send("hello welcome to api");
});


var port = process.env.PORT || 7777;
console.log("Server listining on " + port.toString());
app.listen(port);
