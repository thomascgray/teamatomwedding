var socket = io.connect(window.location.href);

var converter = new showdown.Converter({
	'noHeaderId' : 'true'
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
		addNewMessage(data);
	});
});

function processSubmission() {
	var text = $('#new-message-box').val();

	text = _.trim(text);

	if (text == '') {
		return true;
	}

	// add the new message into the div
	addNewMessage({
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

	if (text == "admin:nuke") {
		$('#messages').empty();
		return true;
	}

	if (text == 'admin:newcolour') {
		getMeNewColour();
		return true;
	}

	text = text.slice(0, maxChars);

	var messageHtml = converter.makeHtml(text);

	messageHtml = "<span style='color:" + data.colour + "'>" + messageHtml + "</span>"

	$('#messages').append(messageHtml);

	window.scrollTo(0,document.body.scrollHeight);
}

function getMyColour() {
	var myColour = localStorage.getItem('teamatomtalk-mycolour');

	if (undefined == myColour || '' == myColour) {
		myColour = randomColor({
						luminosity: 'dark'
					});
	}

	localStorage.setItem('teamatomtalk-mycolour', myColour);

	return myColour;
}

function getMeNewColour() {
	var myColour = randomColor({
				       luminosity: 'dark'
				   });
	localStorage.setItem('teamatomtalk-mycolour', myColour);
}
