http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var comic = require('../models/comicStrip');
var comic_model = mongoose.model('comicStrip');
var comicCount = comic_model.count();

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
		comic_model.find(function(err, comic_data) {
			if (err) {
				res.send("There was a problem accessing the database.");
				res.render('home_page',{ user: req.user, comiclist: JSON.stringify(comic_data)});
			}
			else {
					// And forward to success page
				console.log(comic_data);
				res.render('home_page',{ user: req.user, comiclist:JSON.stringify(comic_data)});
			}
		});
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

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Get publish page*/
	router.get('/Publish', isAuthenticated, function(req, res) {
			res.render('Publish',{user:req.user});
	});

	router.get('/comic/:comicId', function(req, res){
		var comicId = req.params.comicId;
		console.log(comicId);
		comic_model.findOne( {'_id' : comicId}, function(err, comic_data) {
			if (err) {
				res.send("There was a problem accessing the database.");
				res.redirect('/');
			}
			else {
					// And forward to success page
				console.log(comic_data);
				res.render('Comic', {user:req.user, comic:comic_data});
			}})
		});

	/* Posting to publish service          @ 2/10/2016*/
router.post('/publish', function (req, res) {
		// Get our form values.
		var comicTitle = req.body.title;
		console.log(comicTitle);
		var comicAuthor = req.body.author;
		console.log(comicAuthor);
		var comicImage = req.body.image;
		console.log(comicImage);
		var comicTag1 = req.body.tag1;
		var comicTag2 = req.body.tag2;
		var comicTag3 = req.body.tag3;
		var comicTag4 = req.body.tag4;

	//    var user = new Comic(comicTitle, comicAuthor, comicIamge, comicTag1, comicTag2, comicTag3, comicTag4);
		// Set our collection
		// Submit to the DB

		var comic = new comic_model({
				"title": comicTitle,
				"author": comicAuthor,
				"image": comicImage,
				"tag1": comicTag1,
				"tag2": comicTag2,
				"tg3": comicTag3,
				"tag4": comicTag4,
				"refID": 0
			})
			console.log("saving comic " + comic)
			comic.save(function (err, doc) {
				if (err) {
						console.log("fail")
						// If it failed, return error
						res.send("There was a problem adding the information to the database.");
						res.redirect("/");
				}
				else {
						// And forward to success page
						console.log("sucess")
						res.redirect("/");
				}
			});
	});

	/* Comic list */
	router.get('/comiclist', function (req, res) {
			comic_model.find(function(err, comic_data) {
				if (err) {
					res.send("There was a problem accessing the database.");
					res.redirect("/");
				}
				else {
						// And forward to success page
						console.log("sucess " + comic_data)
						res.render('comiclist',{user:req.user, comiclist: comic_data});
				}
			});
		});

	return router;
}
