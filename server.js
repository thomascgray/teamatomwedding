const port = 80;

// get the templating in
var swig = require('swig');

// setup the server
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// wtf why do i have to do all of this?
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/public');
app.set('view cache', false);
// routes for static files? in what universe is this better than PHP?
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/stickers', express.static(__dirname + '/public/stickers'));
swig.setDefaults({ cache: false });

var getExternalIP = require('external-ip')();

getExternalIP(function (err, ip) {
	if (err) {
		throw err;
	}
	console.log(" External address:  "+ip+":"+port);
	console.log(" (Accessible only if that port is forwarded)\n");
});

var messages = [];

server.listen(port);

app.get('/', function (req, res) {
	res.render('photos', {});
});

app.get('/talk', function(req, res) {
	res.render('index', {});


});


io.on('connection', function (socket) {

	// send all messages to new user
	socket.emit('new-user', messages);

	// add message to messages and broadcast
	socket.on('message', function (data) {
		if (data === 'admin:nuke') {
			nuke();
		}
		messages.push(data);
		socket.broadcast.emit("new-message", data);
	});

});

function nuke() {
	messages = [];
	io.emit('new-user', []);
}
