var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.passport);
  console.log(req.session.passport.user);
  if(req.session.passport && req.session.passport.user){
    id = req.session.passport.user;

    models.user.findAll({
      where: {
        id: id
      }
    }).then(function (user) {
      // res.send({comments : user[0].Comments});
      res.render('profile', { phone_number: user[0].phone_number, first_name: user[0].firstname,
       last_name: user[0].lastname, nick_name: user[0].nickname, email: user[0].email});
    });
  } else {
    res.send({message:"not authenticated"});
  }

});

router.post('/update_phone_number', function(req, res, next) {
  if(req.session.passport && req.session.passport.user){
    console.log(req.session.passport.user);
    id = req.session.passport.user;
    models.user.update({ phone_number : req.body.phone_number},
      {
        where: {
          id: id
      },
      returning : true
    }).then(function (user) {
      console.log(user);
      res.send({phone_number : req.body.phone_number});
    });
  } else {
    res.send({message:"not authenticated"});
  }
    // models.User.update();
});

router.post('/update_info', function(req, res, next) {
  if(req.session.passport && req.session.passport.user){
    console.log(req.session.passport.user);
    id = req.session.passport.user;
    models.user.update({lastname : req.body.last_name, firstname : req.body.first_name, nickname : req.body.nick_name, email : req.body.email},
      {
        where: {
          id: id
      }
      // returning : true
    }).then(function (user) {
      res.send({lastname : user.lastname, firstname : user.firstname, nickname : user.nickname, email : user.email});
      // res.send('done');
    });
  } else {
    res.send({message:"not authenticated"});
  }
    // models.User.update();
});



module.exports = router;
