var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var db = require('./db');
var session = require('express-session');

var log = require('./config/log');
logger = log.logger('app');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var user = require('./routes/user');
var form = require('./routes/form');
var login = require('./routes/login');
var register = require('./routes/register');
var auth = require('./routes/auth');
var public =require('./routes/public');
var publicAPI = require('./routes/public/api');
var question = require('./routes/question');
var answer = require('./routes/answer');
var statistics = require('./routes/statistics');
var admin = require('./routes/admin');
var adminLogin = require('./routes/admin/login');
var adminAuth = require('./routes/admin/session');
var artTemplate = require('express-art-template');
var wx = require('./routes/wx');

var app = express();

// view engine setup
app.engine('html', artTemplate);
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
  imports: {
    dateFormat(value) {
       const date = new Date(value);
      return date.getFullYear() + '年' 
        + (date.getMonth() + 1) + '月' 
        + date.getDate() + '日'; 
    },
  },
});
app.set('views', './views');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(log.log4j.connectLogger(log.logger('access')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'zldsl18w',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', login);
app.post('/register', register, login);
app.use('/user', auth, user);
app.use('/form', auth, form);
app.use('/question', auth, question);
app.use('/answer', answer);
app.use('/statistics', auth, statistics);
app.use('/admin/login', adminLogin);
app.use('/admin', adminAuth,admin);
app.use('/wx', wx);
app.get('/:id', public);
app.get('/public/:id', publicAPI);


// 处理404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理500
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  logger.error(err);
  res.render('error', { status: err.status });
});

module.exports = app;
