var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send("hello welcome to api");
});

console.log("Server listining on 7777");
app.listen(7777);
