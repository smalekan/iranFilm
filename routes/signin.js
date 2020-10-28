var authController = require('../controllers/authcontroller.js');
var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', isLoggedIn,  authController.signin);
// router.post('/', function(req, res){
//     console.log("sign in post called");
//     res.render('test');
//   }
// );

//
router.post('/', passport.authenticate('local-signin', {
        successRedirect: '/main',

        failureRedirect: '/signin'
    }

));

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      res.redirect('/dashboard');
    }
    return next();


}
module.exports = router;
