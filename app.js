var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var book = require('./models/bookModel');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

var bookRouter = require('./routes/bookroutes.js')(book);
var authorRouter = require('./routes/authorroutes.js')();

app.use('/api/books', bookRouter); //  to use a specific get / post router
//app.use('/api/author', authorRouter);

app.get('/',function(req,res){
    res.send("hello welcome to api");
});


var port = process.env.PORT || 7777;
console.log("Server listining on " + port.toString());
app.listen(port);