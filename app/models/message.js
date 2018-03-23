var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var MessageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Message', MessageSchema);
