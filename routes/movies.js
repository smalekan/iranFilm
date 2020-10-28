var authController = require('../controllers/authcontroller.js');
var express = require('express');
var passport = require('passport')
var models = require('../models');

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/posters/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})


var router = express.Router();

/* GET home page. */
router.get('/recent/:number',  function (req, res, next) {
  console.log('recent movies');
  var result;
  if(isNaN(parseFloat(req.params.number)) || !isFinite(req.params.number)){
    res.send({message:'wrong_number'});
  }
  models.Movie.findAll({limit : parseInt(req.params.number) , attributes : ['id','title','original_title','year','poster_url'] ,raw : true}).then(function (movies) {
    res.send({movies:movies});
  });
});

/* GET home page. */
router.get('/:id/details',  function (req, res, next) {
  console.log('movie details');
  if(isNaN(parseFloat(req.params.id)) || !isFinite(req.params.id)){
    res.send({message:'wrong_id'});
  }
  models.Movie.findById(req.params.id).then(function (movie) {
    res.send(movie);
  });
  // res.send(movies)
});


/* GET home page. */
router.get('/:id/comments',  function (req, res, next) {
  console.log('movie comments');
  console.log(req.params.id);
  models.Movie.findAll({
    where: {
      id: req.params.id
    },
    include : [{model : models.Comment}]
  }).then(function (movie) {
    res.send({comments : movie[0].Comments});
  });
  // res.send(movies)
  // res.send(movie);
});


/* GET home page. */
router.post('/:id/comments',  function (req, res, next) {
  console.log('post movie comments');
  console.log(req.params.id);
  console.log("comment : " + req.body.comment);
  if(req.session.passport && req.session.passport.user){
    console.log(req.session.passport.user);
    id = req.session.passport.user;
    models.user.findAll({
      attributes : ['id','firstname','lastname','nickname','phone_number','email'] ,
      raw : true,
      where: {
        id: id
      }
    }).then(function (user) {
      // res.send(user[0]);
      console.log(req.params);
      models.Comment.create({
        author: user[0].firstname + user[0].lastname,
        comment: req.body.comment,
        rate: Math.floor((Math.random() * 10) + 1),
        MovieId : req.params.id
      }).then(function(comment) {
        res.send({comments : [comment]});
      });
    });
  } else {
    res.send({message:"not authenticated"});
  }

    // models.Movie.findAll({
    //       where: {
    //         id: req.params.id
    //       },
    //       include : [{model : models.Comment}]
    //   }).then(function (movie) {
    //     res.send({comments : movie[0].Comments});
    // });
    // res.send(movies)
  });



  /* GET home page. */
  router.post('/create', upload.single('poster_file'), function (req, res, next) {

    /** When using the "single"
          data come in "req.file" regardless of the attribute "name". **/
    // var tmp_path = req.file.path;
    //
    // /** The original name of the uploaded file
    //     stored in the variable "originalname". **/
    // var target_path = 'public/posters/' + req.file.originalname;
    //
    // /** A better way to copy the uploaded file. **/
    // var src = fs.createReadStream(tmp_path);
    // var dest = fs.createWriteStream(target_path);
    // src.pipe(dest);
    // src.on('end', function() { res.render('complete'); });
    // src.on('error', function(err) { res.render('error'); });

    // // if()
    // console.log(req.files);
    console.log(req.file);
    console.log(req.body);
    // console.log(req.params);
    // // console.log(req.files);
    //
    // res.send('ok');
    // return;

    models.Movie.create({
      title : req.body.title,
      length : req.body.length,
      year : req.body.year,
      country: req.body.country,
      description: req.body.description,
      director: req.body.director,
      poster_url : req.file.originalname

    }).then(function (movie) {
      res.redirect('/main');

    });
    //
    // console.log('slug');
    // console.log(req.params.id);
    // console.log("comment : " + req.body.comment);
    // if(req.session.passport && req.session.passport.user){
    //   console.log(req.session.passport.user);
    //   id = req.session.passport.user;
    //   models.user.findAll({
    //     attributes : ['id','firstname','lastname','nickname','phone_number','email'] ,
    //     raw : true,
    //     where: {
    //       id: id
    //     }
    //   }).then(function (user) {
    //     // res.send(user[0]);
    //     console.log(req.params);
    //     models.Comment.create({
    //       author: user[0].firstname + user[0].lastname,
    //       comment: req.body.comment,
    //       rate: Math.floor((Math.random() * 10) + 1),
    //       MovieId : req.params.id
    //     }).then(function(comment) {
    //       res.send({comments : [comment]});
    //     });
    //   });
    // } else {
    //   res.send({message:"not authenticated"});
    // }

      // models.Movie.findAll({
      //       where: {
      //         id: req.params.id
      //       },
      //       include : [{model : models.Comment}]
      //   }).then(function (movie) {
      //     res.send({comments : movie[0].Comments});
      // });
      // res.send(movies)
    });

  module.exports = router;
