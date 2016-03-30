
var mongoose = require('mongoose');

module.exports = mongoose.model('workspace',{
  title: String,
  author:[String],
  images:[String],
  panels:[String],
  length:Number,
  uploaders:[String],
  tags:[String],
  comic:[String]
});
