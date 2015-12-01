var bookController = function(book){
	
	var post = function(req,res){
        
		var Book = new book(req.body);
		
		if(!req.body.title){
			res.status(400);
			res.send('title.is.requires');
		}else{
			Book.save();
			console.log(Book);
			res.status(201);
			res.send(Book);
		}
	};
	
	var get = function(req,res){

        var query = {};

        query = req.query;  // ?genre = x === req.query = {genre : fiction}

        if(req.query.genre){
            query.genre = req.query.genre;   ///to filter dataabase : ;
        }

        book.find(query ,function(err,book){
            if(err) {
                //console.log(err);//not to implement
                res.status(500);
				res.send(err);
            }
            else{
				var returnBooks = [];
				book.forEach(function(element, index, array) {
					var newBook = element.toJSON();	
					
					newBook.links = {};
					newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
					
					returnBooks.push(newBook);			
				});
                res.json(returnBooks);
            }
        });
        //res.json(book); // resend a json object
    };
	
	return {
		post: post,
		get: get 
	}
}

module.exports = bookController;