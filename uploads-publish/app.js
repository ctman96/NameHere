/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , cloudinary = require('cloudinary')
  , fs = require('fs')
  , crypto = require('crypto')
  ;

var app = express();

app.locals.title = "Welcome to your workspace";

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  cloudinary.config({ cloud_name: 'namehere', api_key: '783437419356992', api_secret: 'CvG35tk6ty9c3jU4cpCQHgMv1g0' });
});

app.locals.api_key = cloudinary.config().api_key;
app.locals.cloud_name = cloudinary.config().cloud_name;

app.get('/', function(req, res, next){
  cloudinary.api.resources(function(items){
    res.render('index', { images: items.resources, title: 'Upload your comic strips here!', cloudinary: cloudinary });
  });
});

app.post('/upload', function(req, res){
  var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
    , cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/workspace'); });

  imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
});

app.get('/workspace', function(req, res, next){
  cloudinary.api.resources(function(items){
    res.render('workspace', { images: items.resources, title: 'Rearrange your uploaded panels to create a new comic strip!', cloudinary: cloudinary });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port', app.get('port'));
});
