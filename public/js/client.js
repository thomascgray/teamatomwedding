// setup sockets and constants
var socketConnection = location.protocol + "//" + location.host;
var socket = io.connect(socketConnection);
var converter = new showdown.Converter();
var maxChars = 500;

socket.on('welcome', function (messages) {
	$(data).each(function(index, message) {
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
		addNewSticker(stickerKey, getMyColour());
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

	if (text == "admin:nuke") {
		$('#messages').empty();
		return true;
	}

	// add the new message into the div
	renderTextMessage({
		message : text,
		colour : getMyColour()
	});

	// emit the data through the socket
	socket.emit("message", {
		message : text,
		colour : getMyColour()
	});

	$('#new-message-box').val('');
}

function addNewMessage(data) {
	var text = data.message;
	text = _.escape(text);



	if (text == 'admin:newcolour') {
		getMeNewColour();
		return true;
	}

	// limit the text
	text = text.slice(0, maxChars);

	// then markdown it
	var messageHtml = converter.makeHtml(text);

	// then linkify it
	messageHtml = anchorme.js(messageHtml);

	// then make sure it is coloured ... (thats probably racist)
	messageHtml = "<span style='color:" + data.colour + "'>" + messageHtml + "</span>"

	$('#messages').append(messageHtml);

	window.scrollTo(0,document.body.scrollHeight);
}

function addNewSticker(stickerKey, colour) {

	var imageUrl = 'stickers/' + stickerKey;

	var imageHtml = "<img style='border:2px solid " + colour + "' width='150' height='150' src=" + imageUrl + " alt='' /></span>";

	$('#messages').append(imageHtml);

	$('#myModal').modal('hide');


}

function renderMessage(message) {
	if (undefined !== message.text) {
		renderTextMessage(message);
	} else if (undefined !== message.stickerKey) {
		renderStickerMessage(message);
	}
}

function renderTextMessage(message) {

}

function renderStickerMessage(message) {
	var imageUrl = 'stickers/' + message.stickerKey;

	var imageHtml = "<img style='border:2px solid " + message.colour + "' width='150' height='150' src=" + imageUrl + " alt='' /></span>";

	$('#messages').append(imageHtml);

	$('#myModal').modal('hide');
}
