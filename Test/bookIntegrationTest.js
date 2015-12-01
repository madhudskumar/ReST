var should = require('should'),
	request = require('supertest'),
	app = ('../app.js'),
	mongoose = require('mongoose'),
	Book = mongoose.model('book'),
	agent = request.agent(app);
	
describe('book crud test', function(){
	it('allow book post return read and _id',function(){
		var bookPost = {title:'new Book',author:"jon",genre:'fiction'};
		
		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end(function(err,results){
				results.body.read.should.equal(false);
				results.body.should.have.property('_id');
				done();
			})
	})
	
	afterEach(function(done){
		Book.remove().exec();
		done(); 
	})
})