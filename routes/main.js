var authController = require('../controllers/authcontroller.js');
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('main', { isAuth: true });
  } else {
      res.render('main' , {isAuth : false})
  }
});
module.exports = router;
