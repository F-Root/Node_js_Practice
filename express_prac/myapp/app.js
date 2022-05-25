var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const callRouter = require('./routes/call');
const postRouter = require('./routes/post');
const blogRouter = require('./routes/blog');
//mongoDB
const dbconnect = require('./models/index');
dbconnect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//예전에는 express.json()이 아니라 body-parser를 사용했음

// body-parser 모듈 불러오기
// const bodyParser = require('body-parser');
// 요청 본문을 json 형태로 파싱
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//하지만 버전 업데이트 후 express 4.16버전 이상 부터는 express에 기본적으로 parser가 탑재되어 있다
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//쿠키
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors 처리
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

//주소를 찾는 것이 Routing. Router의 역할
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/call', callRouter);
app.use('/post', postRouter);
app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
