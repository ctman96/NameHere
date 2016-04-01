///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	username: String,
	password: String,
	profilepic: String,
	friends: [String],
	messages: [{User:String,Message:String}],
	favourites: [String],
});