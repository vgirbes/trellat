function addurl(id) {
	var id = parseInt(id) + 1;
	$('.add-button').hide();
	$('<div/>', {
	    id: 'url' + id,
	    class: 'buttons'
	}).appendTo('.container-fluid');
	$('<div/>', {
	    class: 'url',
	    style: 'margin-top:30px'
	}).appendTo('#url' + id);
	$('<input>', {
		type: 'text',
		class: 'url-text',
		name: 'url[]',
		id: 'url-text-' + id,
		placeholder: 'http://'
	}).appendTo('#url' + id);
	$('<div/>', {
		id: 'boton' + id,
		class: 'boton'
	}).appendTo('#url' + id);
	$('<input>', {
		type: 'button',
		class: 'delete-button',
		click: function () { 
			$('#url' + id).remove();
			var numElem = $('.url-text').size();
			var buttonId = 'button' + (parseInt(id)-1);
			var buttonActualId = 'button' + numElem;

			if (buttonId === buttonActualId) {
				$('#'+buttonId).show();
			}

			if (numElem == 1) {
				$('.add-button').show();
			}
		},
		value: 'X'
	}).appendTo('#boton' + id);
	$('<input>', {
		id: 'button' + id,
		type: 'button',
		class: 'add-button',
		click: function () { addurl(id); },
		style: 'margin-left:4px;',
		value: 'Add'
	}).appendTo('#boton' + id);
}

function checkCookiesPolicy() {
	if (localStorage) {
		var cookies = localStorage.getItem('cookies-policy');
		if (!cookies) {
			$('#cookies').show();
		}
	} else {
		$('#cookies').show();
	}
}

function acceptCookies() {
	if (localStorage) {
		localStorage.setItem('cookies-policy', 'checked');
	}
	$('#cookies').hide();
}

$(document).ready(function() {
	checkCookiesPolicy();
	$('#accept-cookies').click(function() {
		acceptCookies();
	});

	$('.shorten').click(function() {
		var count = 1;
		var map = 'description=' + $('#description').val();
		$("input[type=text]").each(function() {
		    map += '&url' + count + '=' + this.value;
		    count++;
		});

		$.ajax({
		    url : "/shorten",
		    type: "POST",
		    data : map,
		    success: function(data, textStatus, jqXHR)
		    {
		        response = JSON.parse(data);
		        msg = response.status_msg;
		        $('#response').html(msg).show();
			if (response.error == 0) {
		        $('.fb-share-button').attr('data-href', 'http://trell.at/' + response.hash);
		        $('#social').html('<a href="https://twitter.com/share" class="twitter-share-button"{count} data-url="http://trell.at/'+ response.hash +'" data-size="large">Tweet</a>' +
				'<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>');
				(function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5&appId=375936502526226";
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			}
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		 
		    }
		});
	});
});
