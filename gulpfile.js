var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	gulpMocha = require('gulp-mocha'),
	env = require('gulp-env').
	supertest = require('supertest');
	
var port = 7777;

gulp.task('default',function(){
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: port 
		},
		ignore: ['./node_modules/**']
	})
	.on('restart',function(){
		console.log('server restarted on PORT ' + port);
	});
})

gulp.task('test', function(){
	env({vars:{ENV:'Test'}});
	gulp.src('Test/*.js',{read:false})
		.pipe(gulpMocha({reporter: 'nyan'})); 
})