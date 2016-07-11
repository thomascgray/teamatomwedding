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
		processTextMessageSubmission();
	});

	// sending a sticker message
	$('.sticker-button').on('click', function() {
		var stickerKey = $(this).data('key');
		socket.emit("message", {
			stickerKey : stickerKey,
			colour: getMyColour()
		});
	});

});

function processTextMessageSubmission() {
	var text = $('#new-message-box').val();

	text = _.trim(text);

	if (text == '') {
		return true;
	}

	// emit the data through the socket
	socket.emit("message", {
		text : text,
		colour : getMyColour()
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

	text = _.escape(text);

	// limit the text
	text = text.slice(0, maxChars);
	console.log(text);

	// then markdown it
	var messageHtml = converter.makeHtml(text);

	// then linkify it
	messageHtml = anchorme.js(messageHtml);

	// then make sure it is coloured (thats probably racist)
	messageHtml = "<span style='color:" + message.colour + "'>" + messageHtml + "</span>"

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
