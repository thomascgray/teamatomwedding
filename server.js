const port = 80;

var express = require('express');
var swig = require('swig');

var app = express();

// wtf why do i have to do all of this?
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');

// routes for static files? in what universe is this better than PHP?
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

// wtf is even happening
app.listen(port, function () {
	console.log('Example app listening on port ' + port);
});

app.get('/', function (req, res) {
	res.render('index', {});
});

app.get('/example', function (req, res) {
	res.render('example', {});
});