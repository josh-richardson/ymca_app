const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const validator = require('express-validator');
const config = require('./config/config');
const morgan = require('morgan');

mongoose.Promise = Promise;

mongoose.connect(config.db_path, {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
    },
    function (err) {
        if (err) {
            console.log("Failed to connect to mongo: " + err);
        } else {
            console.log('Connected to mongodb.');
        }
    });

require('./config/passport');

const index = require('./routes/index');
const api_users = require('./routes/api/users');
const api_methods = require('./routes/api/mentors');
const api_admin = require('./routes/api/admins');
const admin_interface = require('./routes/admin_interface');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(validator());
app.use(passport.initialize());

app.use('/', index);
app.use('/api/users', api_users);
app.use('/api/methods', api_methods);
app.use('/api/admins', api_admin);
app.use('/admin', admin_interface);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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
