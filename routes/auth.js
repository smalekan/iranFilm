var authController = require('../controllers/authcontroller.js');
var express = require('express');
var passport = require('passport')

var router = express.Router();

/* GET home page. */
router.get('/',  authController.signup);
router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/main',

        failureRedirect: '/signup'
    }

));
module.exports = router;
