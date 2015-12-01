var express = require('express');

var routes = function(book){
    
    var bookRouter = express.Router();
    var bookController = require('../controller/bookcontroller.js')(book);
    
	bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

    bookRouter.use('/:ID',function(req,res,next){
        book.findById(req.params.ID ,function(err,book){
                if(err) {
                    //console.log(err);//not to implement
                    res.status(500).send(err);
                }
                else if(book){
                    req.book = book;
                    next();
                }
                else{
                    res.status(404).send('Book not found');
                }
            });
    });
    bookRouter.route('/:ID')
        .get(function(req,res){
            
            var returnBook = req.book.toJSON();
            
            returnBook.links = {};
            
            var link =  'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
            
            returnBook.links.FilterByThisGenre = link.replace(' ','%20');
            returnBook.links.main = 'http://' + req.headers.host + '/api/books';
                        
            res.json(returnBook);
        })
        .put(function(req,res){        
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            
            req.book.save(function(err){
                if(err){
                    res.status(500).send('error');
                }
                else
                    res.json(req.book);
            });
            
            res.status(200).json(book);
            console.log(book);
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            
            req.book.save(function(err){
                if(err){
                    res.status(500).send('error');
                }
                else
                    res.json(req.book);
         })
         .delete(function(req,res){
             req.book.remove(function(err){
                 if (err) {
                     res.send(500).send("delERR");
                 }
                 else{
                     res.send(204).send("removed");
                 } 
             });
         });
       });
    
    return bookRouter;
}

module.exports = routes;