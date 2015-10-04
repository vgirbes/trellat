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

$(document).ready(function() {
	$('.shorten').click(function() {
		var count = 1;
		var map = '?description=' + $('#description').val();
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
		        console.log(data);
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		 
		    }
		});
	});
});