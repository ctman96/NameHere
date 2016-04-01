http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var cloudinary = require('cloudinary');
var fs = require('fs');
var user = require('../models/user');
var user_model = mongoose.model('User');
var comic = require('../models/comicStrip');
var comic_model = mongoose.model('comicStrip');
var workspace = require('../models/workspace');
var workspace_model = mongoose.model('workspace');
var comicCount = comic_model.count();
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: './tmp/' })

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

	router.get('/search', function(req, res) {
		console.log("beginning search for " + req.query.q)
		db.collection('comicstrips').find({
			"$text": {
				"$search": req.query.q
			}
		}, {
			title: 1,
			author: 1,
			tags: 1,
			panels: 1,
			image:1,
			_id:1,
			textScore: {
				$meta: "textScore"
			}
		}, {
			sort: {
				textScore: {
					$meta: "textScore"
				}
			}
		}).toArray(function(err, results) {
			console.log(results);
			res.render('search', {user: req.user, searchResults: results})
		})
	})

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	/* GET Upload Page */
	router.get('/oldupload', isAuthenticated, function(req, res){
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

	router.post('/copy', isAuthenticated, function (req, res) {
		console.log(req.body);
		if(!req.body.panels) res.redirect('/');

		workspace_model.update(
			req.body.workspace,
			{$push: {panels: {$each: req.body.panels}}},
			{safe: true, upsert: false},
			function(err, model){
				console.log(err);
				res.redirect('/workspace/'+req.body.workspace);
		})
	});


	/* Posting to publish service          @ 2/10/2016*/
router.post('/publish', isAuthenticated, function (req, res) {
		console.log(req.body);
		// Get our form values.
		var comicTitle = req.body.title;
		console.log(comicTitle);
		var comicAuthor = req.body.author;
		console.log(comicAuthor);
		var comicPanels = req.body.panels;
		console.log(comicPanels);
		var comicLength = req.body.truelength;
		var editable = req.body.privacy;
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
				"panels":comicPanels,
				"privacy":editable,
				"length":comicLength,
				"image": comicPanels[0],
				"tags":[comicTitle, comicAuthor, comicTag1, comicTag2, comicTag3, comicTag4],
				"tag1": comicTag1,
				"tag2": comicTag2,
				"tag3": comicTag3,
				"tag4": comicTag4,
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


		/* Upload/publish */
		router.get('/upload', isAuthenticated, function(req, res, next){
		  cloudinary.api.resources(function(items){
		    res.render('newupload', {user:req.user, images: items.resources, title: 'Upload your comic strips here!', cloudinary: cloudinary });
		  });
		});

		router.post('/upload', upload.single('image'), function(req, res){
			console.log(req.file);
			var comicImage = req.file.path;
			console.log(comicImage);
			var results;
			cloudinary.uploader.upload(comicImage, function(result) {
			  console.log(result);
				console.log(req.body.workspace);
				results = result;
				workspace_model.update(
					req.body.workspace,
					{$push: {images: results.url}},
					{safe: true, upsert: false},
					function(err, model){
						console.log(err);
						res.redirect('/workspace/'+req.body.workspace);
				})
			});
		});

		router.get('/workspace/:workspaceId', isAuthenticated, function(req, res, next){
			var workspaceId = req.params.workspaceId;
			console.log(workspaceId);
			workspace_model.findOne( {'_id' : workspaceId}, function(err, workspace_data) {
				if (err) {
					res.send("There was a problem accessing the database.");
					res.redirect('/');
				}
				else {
						// And forward to success page
					console.log(workspace_data);
					res.render('workspace', {user:req.user, workspace:workspace_data, title: 'Rearrange your uploaded panels to create a new comic strip!'});
			}})
		});

		router.post('/addContributor', isAuthenticated, function(req,res, next){
			/*var username;
			user_model.findOne({'username': req.body.friends}, function (err, doc){
				var newworkspaces = doc.workspaces;
				newworkspaces.push(req.body.adduserID);
				username = doc.username;
				doc.workspaces = newworkspaces;
				doc.save();
				workspace_model.findOne({'_id': req.user._id}, function (err, doc){
					var newauthors = doc.author;
					newauthors.push(username);
					doc.save();
				})
			})*/
		});

		router.get('/newWorkspace', isAuthenticated, function(req, res, next){
			var newWorkspace = new workspace;
			newWorkspace.author = req.user.username;
			newWorkspace.save(function(err) {
				if (err){
						console.log('Error in creating workspace: '+err);
						throw err;
				}
				console.log('Workspace creation succesful, ID = '+newWorkspace._id);
				var newworkspaces = req.user.workspaces;
				console.log(req.user.workspaces);
				newworkspaces.push(newWorkspace._id);
				console.log(newworkspaces);
				/*user_model.update(
					{_id: req.user._id},
					{$set:{workspaces: newworkspaces}})
				req.user.workspaces = newworkspaces;*/
				console.log(req.user._id)
				user_model.findOne({'_id': req.user._id}, function (err, doc){
					doc.workspaces = newworkspaces;
					doc.save();
				})
				res.redirect('/workspace/'+newWorkspace._id)
			});
		});

	router.get('/delWorkspace/:workspaceId', isAuthenticated, function(req,res,next){
		console.log('deleting '+ req.params.workspaceId)
		workspace_model.remove( { '_id' : req.params.workspaceId }, function (err) {
		 	if (err) console.log(err);
		});
		user_model.findOne({'_id': req.user._id}, function (err, doc){
			var workspaces = req.user.workspaces;
			var index = workspaces.indexOf(req.params.workspaceId.toString());
			workspaces.splice(index, 1);
			doc.workspaces = workspaces;
			doc.save();
		})
		res.redirect('/')
	})


	return router;
}
