
var mongoose = require('mongoose');

module.exports = mongoose.model('comicStrip',{
  title: String,
  author:String,
  panels:[String],
  length:Number,
  tags:[String],
  image:String,
  tag1:String,
  tag2:String,
  tag3:String,
  tag4:String,
});
