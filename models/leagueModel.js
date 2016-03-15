var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var League = new Schema({
  title:String,
  body:String

});

module.exports = mongoose.model('League', League);
