var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var reviewsRouter = require('./routes/reviewsRouter');
var booksRouter = require('./routes/booksRouter');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const booksService = require("./service/booksService.js")
//booksService.populateDbWithBooks();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/books', booksRouter);
app.get("/recommend", (req, res) => {
  let userId = req.query.userId
  if (Number(userId) > 53424 || Number(userId) < 0) {
      res.send("User Id cannot be greater than 53,424 or less than 0!")
  } else {
      recs = model.recommend(userId)
          .then((recs) => {
              res.render("index", { recommendations: recs, forUser: true })
          })
  }

})

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
