///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var mongoose = require('mongoose');

module.exports = mongoose.model('comicStrip',{
  title: String,
  author:String,
  panels:[String],
  width: Number,
  height: Number,
  tags:[String],
  image:String,
  tag1:String,
  tag2:String,
  tag3:String,
  tag4:String,
});
