var express = require('express');

var routes = function(book){
    
    var bookRouter = express.Router();
    
	bookRouter.route('/')
    .post(function(req,res){
        var Book = new book(req.body);

        Book.save();
        console.log(Book);
        res.status(201).send(Book);
    })
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

bookRouter.route('/:ID')
    .get(function(req,res){
        book.findById(req.params.ID ,function(err,book){
            if(err) {
                //console.log(err);//not to implement
                res.status(500).send(err);
            }
            else{
                res.json(book);
            }
        });
    })
    .put(function(req,res){
        book.findById(req.params.ID ,function(err,book){
            if(err) {
                //console.log(err);//not to implement
                res.status(500).send(err);
            }
            else{
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.status(200).json(book);
                console.log(book);
            }
        });
    });
    
    return bookRouter;
}

module.exports = routes;