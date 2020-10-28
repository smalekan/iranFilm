var authController = require('../controllers/authcontroller.js');
var express = require('express');
var passport = require('passport')

var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn , authController.dashboard);

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}
module.exports = router;
