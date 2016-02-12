
var mongoose = require('mongoose');

module.exports = mongoose.model('comicStrip',{
  title: String,
  authors:[String],
  //panels:[{String}],
  //tags:[String],
  image:String,
  tag1:String,
  tag2:String,
  tag3:String,
  tag4:String,
  refID:Number
});
