var express = require('express');
var app = express();
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var book = require('./models/bookModel');

var bookRouter = express.Router();

bookRouter.route('/books')
    .get(function(req,res){

        var query = {};

        query = req.query;  // ?genre = x === req.query = {genre : fiction}

        if(req.query.genre){
            query.genre = req.query.genre;   ///to filter dataabase : ;
        }

        book.find(query ,function(err,book){
            if(err) {
                //console.log(err);//not to implement
                res.status(500).send(err);
            }
            else{
                res.json(book);
            }
        });
        //res.json(book); // resend a json object
    });

bookRouter.route('/books/:id')
    .get(function(req,res){

        book.findById(req.params.id ,function(err,book){
            if(err) {
                //console.log(err);//not to implement
                res.status(500).send(err);
            }
            else{
                res.json(book);
            }
        });
    });

app.use('/api', bookRouter); //  to use a specifick get / post router

app.get('/',function(req,res){
    res.send("hello welcome to api");
});


var port = process.env.PORT || 7777;
console.log("Server listining on " + port.toString());
app.listen(port);
