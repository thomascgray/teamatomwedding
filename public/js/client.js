// setup sockets and constants
var socketConnection = location.protocol + "//" + location.host;
var socket = io.connect(socketConnection);
var converter = new showdown.Converter();
var maxChars = 500;

socket.on('welcome', function (messages) {
	$(messages).each(function(index, message) {
		renderMessage(message);
	});
	window.scrollTo(0,document.body.scrollHeight);
});

socket.on('new-message', function (message) {
	renderMessage(message);
	window.scrollTo(0,document.body.scrollHeight);
});

$(document).ready(function() {

	// sending a text message
	$('#new-message-box').on('change', function() {
		sendTextMessage();
	});

	// sending a sticker message
	$('.sticker-button').on('click', function() {
		sendStickerMessage($(this));
	});

});

function sendStickerMessage(buttonClicked) {
	var stickerKey = $(buttonClicked).data('key');
	socket.emit("message", {
		stickerKey : stickerKey,
		colour: getMyColour(),
		backgroundColour: getMyBackgroundColour()
	});
}

function sendTextMessage() {
	var text = $('#new-message-box').val();

	text = _.trim(text);

	if (text == '') {
		return true;
	}

	// limit the text
	text = text.slice(0, maxChars);

	// emit the data through the socket
	socket.emit("message", {
		text : text,
		colour : getMyColour(),
		backgroundColour: getMyBackgroundColour()
	});

	$('#new-message-box').val('');
}


function renderMessage(message) {
	if (undefined !== message.text) {
		renderTextMessage(message);
	} else if (undefined !== message.stickerKey) {
		renderStickerMessage(message);
	}
}

function renderTextMessage(message) {
	var text = message.text;

	// escape it (the equilivant of html entities i think?)
	text = _.escape(text);

	// process any commands and possibly end there
	var isContinue = processCommands(text);
	if (false === isContinue) {
		return false;
	}

	// then markdown it
	var messageHtml = converter.makeHtml(text);

	// then linkify it
	messageHtml = anchorme.js(messageHtml);

	// then make sure it is coloured (thats probably racist)
	messageHtml = "<span style='background-color:" + message.backgroundColour + ";color:" + message.colour + "'>" + messageHtml + "</span>"

	// finally, append it inside the messages div
	$('#messages').append(messageHtml);
}

function renderStickerMessage(message) {
	var imageUrl = 'stickers/' + message.stickerKey;

	var imageHtml = "<img style='border:2px solid " + message.colour + "' width='150' height='150' src=" + imageUrl + " alt='' /></span>";

	$('#messages').append(imageHtml);

	$('#myModal').modal('hide');
}

function getMyColour() {
	// TODO this, obviously
	return '#ff0000';
}

function getMyBackgroundColour() {
	// TODO this, obv
	return '#0000ff';
}

function processCommands(text) {
	if ('admin:nuke' === text) {
		$('#messages').empty();
		return false;
	}
}
