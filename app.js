/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view option', { layout: false });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.cookieDecoder());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "keyboard cat" }));
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//homepage
app.get('/', routes.start);
app.get('/error', routes.error);

//login
app.get('/login', routes.login);
app.post('/loginComplete', routes.loginEnter);
app.get('/logout', routes.logout);

//register
app.get('/register', routes.register);
app.post('/registerComplete', routes.registerEnter);

//main
app.get('/:id', routes.main);

//admin
app.get('/admin', routes.start);

//write
app.post('/searchBookForRequest', routes.searchBook);
app.post('/writeComplete', routes.writeCard);
app.get('/changeCardStatus/:cardNum', routes.changeCard);



//create Node Server
http.createServer(app).listen(app.get('port'), function () {
    console.log('\n//////////////////////////////////////////\n' +
                '//// Express server listening on port ' + app.get('port') +
                '\n//////////////////////////////////////////\n');
});
