
var mongoose = require('mongoose');

module.exports = mongoose.model('workspace',{
  title: String,
  author:String,
  images:[{String}],
  panels:[{String}],
  width: Number,
  height: Number,
  tags:[String],
  comic:[{String}]
});
