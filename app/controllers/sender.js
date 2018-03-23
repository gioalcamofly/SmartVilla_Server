var jwt = require('jsonwebtoken');
var Message = require('../models/message');

function setMessageInfo(request) {
  return {
    _id: request._id,
    from: request.from,
    to: request.to,
    message: request.message
  };
}

exports.storeMessage = function(req, res, next) {

  var from = req.body.from;
  var to = req.body.to;
  var message = req.body.message;

  var msg = new Message({
    from: from,
    to: to,
    message: message
  });

  msg.save(function(err, msg){

    if(err){
      return next(err);
    }

    var messageInfo = setMessageInfo(msg);

    res.status(201).json({
      message: messageInfo
    })
  });
}
