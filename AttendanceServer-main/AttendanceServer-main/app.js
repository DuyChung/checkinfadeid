var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shiftsRouter = require('./routes/shifts');
var roomRouter = require('./routes/room');
var locationRouter = require('./routes/location');
var faceRouter = require('./routes/face');
var attendanceRouter = require('./routes/attendance');
var chamcongRouter = require('./routes/chamcong')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shifts', shiftsRouter);
app.use('/room', roomRouter);
app.use('/location', locationRouter);
app.use('/face', faceRouter);
app.use('/attendance', attendanceRouter);
app.use('/chamcong', chamcongRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//kết nối cơ sở dữ liệu
var config = require("./database/database");
mongoose
  .connect(
    `mongodb+srv://duychung:duychung@cluster0.6r5yqku.mongodb.net/test`
  )
  .then(() => {
    console.log("kết nối thành công");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
