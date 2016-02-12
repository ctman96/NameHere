///<reference path='../types/DefinitelyTyped/node/node.d.ts' />
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    return User;
})();



var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res) {
            res.render('index', { title: 'Express' });
        });


        /* Get publish page*/
        router.get('/Publish', function(req, res) {
            res.render('Publish',{title: "Publish Your Comic Strips"});
        });

       

             
    
         /* GET Hello World page. */
        router.get('/helloworld', function(req, res) {
            res.render('helloworld', { title: 'Hello, World!' });
        });


       

        /* POST to Add User Service */
        router.post('/adduser', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var userName = req.body.username;
            var userEmail = req.body.useremail;
            var user = new User(userName, userEmail);
            // Set our collection
            var collection = db.get('usercollection');
            // Submit to the DB
            collection.insert({
                "username": user.getName(),
                "email": user.getEmail()
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });
        




        /* Posting to publish service          @ 2/10/2016*/
        router.post('/publish', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values.
            var comicTitle = req.body.comicTitle;
            var comicAuthor = req.body.comicAuthor;
            var comicIamge = req.body.comicIamge;
            var comicTag1 = req.body.tag1;
            var comicTag2 = req.body.tag2;
            var comicTag3 = req.body.tag3;
            var comicTag4 = req.body.tag4;
          
        //    var user = new Comic(comicTitle, comicAuthor, comicIamge, comicTag1, comicTag2, comicTag3, comicTag4);
            // Set our collection
            var collection = db.get('comiccollection');
            // Submit to the DB
            collection.insert({
                "comicTitle": comicTitle,
                "comicAuthor": comicAuthor,
                "comicIamge": comicIamge,
                "comicTag1": comicTag1,
                "comicTag2": comicTag2,
                "comicTag3": comicTag3,
                "comicTag4": comicTag4,
              }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("comiclist");
                }
            });
        });


        router.get('/userlist', function (req, res) {
            var db = req.db;
            var collection = db.get('usercollection');
            collection.find({}, {}, function (e, docs) {
                res.render('userlist', {
                    "userlist": docs
                });
            });
        });


        /* Comic list */
        router.get('/comiclist', function (req, res) {
            var db = req.db;
            var collection = db.get('comiccollection');
            collection.find({},{},function (e, docs) { 
                res.render('comiclist', {
                    "comiclist": docs
                });
            });

        });
        
        



        router.get('/newuser', function (req, res) {
            res.render('newuser', { title: 'Add New User' });
        });

        module.exports = router;
    }
    return Router;
})();
var Rut = new Router();
