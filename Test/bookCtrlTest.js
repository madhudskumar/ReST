var should = require('should') ,
	sinon = require('sinon');
	
describe('Book Controller TESTS:', function(){
	describe('Post',function(){
		it('shold not allow a no title book',function(){
			var Book = function(book){
				this.save = function(){}
			};
			
			var req = {
				body: {
					author: 'me'
				}
			}
			
			var res = {
				status: sinon.spy(),
					send: sinon.spy()
			}
			
			var bookController = require('../controllers/bookcontroller')(Book);
			
			bookController.post(req,res);
			
			res.status.calledWith(400).should.equal(true, 'bad status' + res.status.args[0][0]);
			res.send.calledWith('Title is required').should.equal(true);
		});
	});
})