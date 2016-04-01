///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var mongoose = require('mongoose');

module.exports = mongoose.model('workspace',{
  title: String,
  author:[String],
  images:[String],
  panels:[String],
  width: Number,
  height: Number,
  uploaders:[String],
  tags:[String],
  comic:[String]
});
