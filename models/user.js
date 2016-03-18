
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	username: String,
	password: String,
	friends: [String],
	messages: [{User:String,Message:String}],
	favourites: [String],
});
