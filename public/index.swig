{% extends 'layouts/default.swig' %}

{% block content %}

	{# <div class="image">
		<img src="http://hairstyletwist.com/uploads/Image/iStock_000002320629XSmall_1.JPG" alt="">
		<span class="caption big">WELCOME TO THE WEDDING!</span>
	</div>

	<div class="image">
		<img src="https://c1.staticflickr.com/1/107/280024881_4d8f1b1fa8_b.jpg" alt="">
		<span class="caption big">WANT TO REQUEST A SONG? 1 SHOT = 1 SONG</span>
	</div>

	<div class="image">
		<img src="http://www.whizzpast.com/wordpress/wp-content/uploads/2015/02/best1930spics.jpg" alt="">
		<span class="caption big">FEEL FREE TO HIT THE BAR FOR REFRESHMENTS</span>
	</div>
	<div class="container">
		<div id="messages"></div>
	</div> #}

	<div id="header">
		<h1><span class='hash'>#</span><span class='one'>TEAM</span><span class='two'>ATOM</span><span class='three'>TWITTER</span></h1>
	</div>

	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12">
				<div id="messages"></div>
			</div>
		</div>
	</div>

	<div id="form">
		<input id='new-message-box' type="text">
		<button id='new-message-button'>GO</button>
	</div>
{% endblock %}
