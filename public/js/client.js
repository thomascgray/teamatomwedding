var socketConnection = location.protocol + "//" + location.host;

var socket = io.connect(socketConnection);

var converter = new showdown.Converter({
	'noHeaderId' : 'true'
});

var maxChars = 500;

$(document).ready(function() {
	socket.on('new-user', function (data) {
		$(data).each(function(i, v) {
			if (undefined !== v.message) {
				addNewMessage(v);
			} else if (undefined !== v.stickerKey) {
				console.log(v);
				addNewSticker(v.stickerKey, v.colour);
			}
		})
	});

	socket.on('new-message', function (data) {
		console.log(data);
		if (undefined !== data.message) {
			addNewMessage(data);
		} else if (undefined !== data.stickerKey) {
			addNewSticker(data.stickerKey, data.colour);
		}
	});

	$('#new-message-box').on('change', function() {
		processSubmission();
	});

	$('#new-message-button').on('click', function() {
		processSubmission();
		$('#new-message-box').focus();
	});

	$('.sticker-button').on('click', function() {
		var stickerKey = $(this).data('key');
		addNewSticker(stickerKey, getMyColour());
		socket.emit("message", {
			stickerKey : stickerKey,
			colour: getMyColour()
		});
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

function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}
