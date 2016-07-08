var socket = io.connect(window.location.href);
var converter = new showdown.Converter({
	noHeaderId : true
});
var maxChars = 140;

$(document).ready(function() {
	$('#new-message-box').on('change', function() {
		processSubmission();
	});
	$('#new-message-button').on('click', function() {
		processSubmission();
	});

	socket.on('new-user', function (data) {
		$(data).each(function(i, v) {
			addNewMessage(v);
		})
	});

	socket.on('new-message', function (data) {
		addNewMessage(data.message);
	});
});

function processSubmission() {
	var text = $('#new-message-box').val();
	if (text == '') {
		return true;
	}
	addNewMessage(text);
	socket.emit("message", text);
	$('#new-message-box').val('');
}

function addNewMessage(message) {
	message = message.slice(0, maxChars);
	$('#messages').append(converter.makeHtml(message));
	window.scrollTo(0,document.body.scrollHeight);
}
