var jwt = require('jsonwebtoken');
var User = require('../models/user');
var authConfig = require('../../config/auth');
var Message = require('../models/message');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        name: request.name,
        surname: request.surname
    };
}

exports.login = function(req, res, next){

    var userInfo = setUserInfo(req.user);


    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });

}

exports.delete = function(req, res, next) {
  var id = req.params.id;

  User.deleteOne({ _id : id }, function(err, obj) {
    if (err) {
      return res.status(422).send({error: err});
    } else {
      return res.status(201).send({delete: 'User deleted correctly'});
    }
  })
}

exports.register = function(req, res, next){

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var surname = req.body.surname;
    var last_visit = 0;

    console.log(email);
    console.log(password);
    console.log(name);
    console.log(surname);
    console.log(last_visit);

    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({email: email}, function(err, existingUser){

        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }

        var user = new User({
            email: email,
            password: password,
            name: name,
            surname: surname,
            last_visit: 0
        });

        user.save(function(err, user){

            if(err){
                return next(err);
            }

            var userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });

    });

}

exports.userList = function(req, res, next) {


  User.find({}, function(err, users) {
    res.status(201).json({
      userList: users
    })
  })
  /*Message.find({}, function(err, users) {
      if (err) {
        console.log(err);
      } else {
        res.render('user-list', users);
        console.log("retrieved list of names");
      }
  })*/
  //res.status(201);
}
