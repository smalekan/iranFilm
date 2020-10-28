var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')


var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');
var main = require('./routes/main');
var profile = require('./routes/profile');

var authRoute = require('./routes/auth');
var login = require('./routes/signin');
var dashboard = require('./routes/dashboard');
var logout = require('./routes/logout');
var movies = require('./routes/movies');
var search = require('./routes/search');
var movie = require('./routes/movie');
var upload_movie = require('./routes/upload_movie');


var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// For Passport

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


//Models
var models = require("./models");

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

require('./config/passport/passport.js')(passport, models.user);


app.use('/', index);
app.use('/user', users);
app.use('/main', main);
app.use('/signup', authRoute);
app.use('/signin', login);
app.use('/dashboard', dashboard);
app.use('/logout', logout);
app.use('/movies/', movies);
app.use('/search', search);
app.use('/movie/', movie);
app.use('/profile/', profile);
app.use('/upload_movie/', upload_movie);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
