var authController = require('../controllers/authcontroller.js');
var express = require('express');
var passport = require('passport')
var models = require('../models');
var router = express.Router();
var sequelize = require('sequelize');
const Op = sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.q);
    var query = req.query.q;

    models.Movie.findAll({
      where : {
        [Op.or]: [
          {
            title: {
              [Op.like]: '%' + query + '%'
            }
          },
          {
            description: {
              [Op.like]: '%' + query + '%'
            }
          }
        ]
      }
    }).then(function (movies) {
        res.render('search' , { movies : movies});
        // res.send('hi1');
    });
    // res.send('hi');
});

module.exports = router;
