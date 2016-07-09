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
		<h1><span class='hash'>#</span><span class='one'>TEAM</span><span class='two'>ATOM</span><span class='three'>TALK</span></h1>
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
		<button data-toggle="modal" data-target="#myModal" id='new-sticker-button'>
			FUN
		</button>
	</div>

	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-body">
	      <div class="row">
	      	<div class="col-xs-6">
				<button class='sticker-button' data-key='tom_ziggy.jpg'>
					<img src="stickers/tom_ziggy.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='tom_senpai.jpg'>
					<img src="stickers/tom_senpai.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='tom_deal_with_it.jpg'>
					<img src="stickers/tom_deal_with_it.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='tom_shocked.jpg'>
					<img src="stickers/tom_shocked.jpg" alt="">
				</button>
	      	</div>
	      	<div class="col-xs-6">
				<button class='sticker-button' data-key='alice_angry.jpg'>
					<img src="stickers/alice_angry.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='alice_want.jpg'>
					<img src="stickers/alice_want.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='alice_zorro.jpg'>
					<img src="stickers/alice_zorro.jpg" alt="">
				</button>
				<button class='sticker-button' data-key='alice_cry.jpg'>
					<img src="stickers/alice_cry.jpg" alt="">
				</button>
	      	</div>
	      </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
{% endblock %}
