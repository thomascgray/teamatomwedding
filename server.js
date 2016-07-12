const port = 80;

// setup the server
var swig = require('swig');
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// i always love me a bit of lodash
var _ = require('lodash');

// setup swig for rendering and all our routes for assets
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/public');
app.set('view cache', false);
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/stickers', express.static(__dirname + '/public/stickers'));
swig.setDefaults({ cache: false });

var messages = [];

server.listen(port);

app.get('/', function (req, res) {
	res.render('photos', {});
});

app.get('/talk', function(req, res) {
	res.render('index', {});
});

io.on('connection', function (socket) {
	// on connection, send the user
	// the most recent messages
	socket.emit('welcome', _.takeRight(messages, 50));
	console.log("New user - sending welcome messages");

	// when the server receives a message, we process it
	// , add it to the queue and then broadcast the event back
	// out with the message attached
	socket.on('message', function (message) {
		console.log("**message received**");
		console.log(message);
		var isSaveAndBroadcast = processNewMessage(message);

		if (isSaveAndBroadcast) {
			console.log("saving and broadcasting message");
			newMessage(message);


			// TODO trim the messages down to the most recent
			// 500 or something here whenever you get a new message
		}
	});
});

function processNewMessage(message) {
	if (undefined !== message.text) {
		if ('admin:nuke' == message.text) {
			console.log("nuking messages");
			nuke();
			return false;
		}
	}
	return true;
}

function nuke() {
	messages = [];
	io.emit('welcome', messages);
}

function newMessage(message) {
	messages.push(message);
	io.emit("new-message", message);
}
