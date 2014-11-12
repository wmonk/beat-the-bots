var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var start = require('./routes/start');
var update = require('./routes/update');
var move = require('./routes/move');
var dash = require('./routes/index');

var fs = require('fs');
var chalk = require('chalk');

var app = express();

var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {
    flags: 'a'
});
app.use(morgan('combined', {
    stream: accessLogStream
}));

app.use(function (req, res, next) {
    var game = require('./lib/game').current();
    if (game) {
        console.log(chalk.gray('Card:'), chalk.red(game.card), chalk.gray('Chips:'), chalk.green(game.chips), chalk.gray('Opponent:'), chalk.blue(game.opponent));
    }

    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dash);
app.use('/', start);
app.use('/', move);
app.use('/', update);
app.use('/version', function (req, res) {
    require('git-rev').long(function (version) {
        res.send(version);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        console.error(JSON.stringify(err));
        message: err.message,
        error: {}
    });
});

module.exports = app;
