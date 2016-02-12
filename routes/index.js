http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('home_page', { user: req.user });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Upload Page */
	router.get('/upload', function(req, res){
		res.render('upload', { user: req.user });
	});

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register', { user: req.user });
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/home_page', function(req,res){
//		var db = req.db;
//    var collection = db.get('ComicStrips');
//		collection.find({},{},function(e,docs){
//				res.render('home_page', {user: req.user}, {"Comics" : docs});
//		});
	res.render('home_page',{user:req.user})
	});
	/*
	 * GET ComicStrips.
	 */
	router.get('/comics', function(req, res) {
		  var db = req.db;
			console.log(db);
	    //db.ComicStrips.find({},{},function(e,docs){
	    //    res.json(docs);
	    //});
	});

	return router;
}
