var express = require('express');
var router = express.Router();
var authController = require('../controllers/authcontroller.js');
var express = require('express');
var passport = require('passport')
var models = require('../models');
var router = express.Router();
var sequelize = require('sequelize');
const Op = sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  console.log(req.session);
  console.log(req.session.passport);
  console.log(req.session.passport.user);
  var id ;
  if(req.session.passport && req.session.passport.user){
    id = req.session.passport.user;
    models.user.findAll({
      attributes : ['id','firstname','lastname','nickname','phone_number','email'] ,
      raw : true,
      where: {
              id: id
      }
    }).then(function (user) {
        res.send(user[0]);
      });
  } else {

  }

  // res.send(req.session.passport);
});

// 
// /* GET users listing. */
// router.post('/', function(req, res, next) {
//   // var firstname = req.params.firstname;
//   // var lastname = req.params.lastname;
//   // var nickname = req.params.nickname;
//   // var phone_number = req.params.phone_number;
//   // var email = req.params.email;
//   //
//   // id = req.session.passport.user;
//   // models.user.update({
//   //   firstname: firstname,
//   //   lastname: lastname,
//   //   nickname: nickname,
//   //   phone_number: phone_number,
//   //   email: email,
//   // }, {
//   //   where: {
//   //     id : id
//   //   }
//   // });
//
//   res.send('do not respond with a resource');
// });

module.exports = router;
