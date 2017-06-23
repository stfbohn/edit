var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// let httpRequest = new XMLHttpRequest();

// httpRequest.onreadystatechange = function(){
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//       if (httpRequest.status === 200) {
//         console.log(httpRequest.responseText);
//       } else {
//         console.log("bad one " + httpRequest.status); 
//       } 
//     } else {
//       console.log("Not ready yet"); 
//     }
// };

// httpRequest.open('GET', 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBQLd206nVJp5NKjsr7an_SrilLNSpXN5Q', true);
// httpRequest.send();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/edit', function (req, res) {
  res.render('edit')
});
app.get('/form', function (req, res) {
  res.render('form')
});
app.get('/font', function (req, res) {
  res.render('fontpicker')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
/*
var parse = require('pug-parser');
var lex = require('pug-lexer');
var filename = 'my-file.pug';
var src = 'div(data-foo="bar")';
var tokens = lex(src, {filename});
var ast = parse(tokens, {filename, src});

var output = ''; 
function getNodes(subject, level)
{
    if(subject.type == "Tag") {
      output += level.toString() + ':' + subject.name + '\n'; 
      console.log("["+ level +"]" + subject.type)
    }
    else {
      console.log("["+ level +"]" + "not tag:", subject.type)
    }
    var nodes = subject.nodes; 
    nodes.forEach(function(nextEle) {
      getNodes(nextEle, level+1);
    }, this);
}

var l = 0; 
console.log('hello');
getNodes(ast,0); 
console.log("output", output);

//console.log(JSON.stringify(ast, null, '  '))

*/



module.exports = app;
