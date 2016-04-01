
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	username: String,
	password: String,
	profilepic: String,
	friends: [String],
	workspaces: [String],
	messages: [{User:String,Message:String}],
	favourites: [String],
});
