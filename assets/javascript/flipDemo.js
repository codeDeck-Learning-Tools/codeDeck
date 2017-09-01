// jquery-flipper demo
// ------------------------------------------------------------------
// Returns a new card html element with data attributes
var flipperJS = function(front, back, id, data) {
	var $card = $("<div class='card'>").attr("id", id);
	var $front = $("<div class='front'>");
	var $back = $("<div class='back'>");

	// add data attributes to card element
	if ( typeof data !== 'undefined' ) {
		$.each(data, function(key) {
			$card.attr("data-" + key, this);
		});
	}
	// append front and back to card
	$front.append(front).appendTo($card);
	$back.append(back).appendTo($card);

	$($card).flipper({event: "click"});

	// return card element
	return $card.get();
}


// runs the flipper Demo
var flipperDemo = function () {
	// clear page
	$("body").empty().append("<div class='container'>");

	// build demo page
	var $column = $("<div class='col-xs-3'>")
	var $panel = $(
			"<div class='panel panel-default' style='margin-top:2em;'>"
			+ "<div class='panel-body'></div>"
			+ "</div>"
		);

	var $row = $("<div class='row'>").hide();


	for ( var i = 0; i < 4; i++ ) {
		var $newFront = $panel.clone();
		var $newBack = $panel.clone();
		var $clone = $column.clone();

		$("<h3>Front</h3><p>Card " + i + " front</p>")
			.appendTo($newFront.find(".panel-body"));

		$("<h3>Back</h3><p>Card " + i + " back</p>")
			.appendTo($newBack.find(".panel-body"));

		var newCard = flipperJS($newFront.get(), $newBack.get(), "card-" + i);

		$clone.append(newCard).appendTo($row);
	}

	$(".container").append($row);
	$row.show();
}


// jquery.flip.js demo
// ------------------------------------------------------------------

// Returns a new card html element with data attributes
var flipJS = function(front, back, data) {
	var $card = $("<div class='card'>");
	var $front = $("<div class='front'>");
	var $back = $("<div class='back'>");

	// add data attributes to card element
	if ( typeof data !== 'undefined' ) {
		$.each(data, function(key) {
			$card.attr("data-" + key, this);
		});
	}

	// append front and back to card
	$front.append(front).appendTo($card);
	$back.append(back).appendTo($card);

	// add flip to card
	$card.flip();

	// return card element
	return $card.get();
}
// runs the flipJSDemo
function flipJSDemo() {	

	// clear page
	$("body").empty().append("<div class='container'>");

	// build demo page
	var $column = $("<div class='col-xs-3'>")
	var $panel = $(
			"<div class='panel panel-default' style='margin-top:2em;'>"
			+ "<div class='panel-body'></div>"
			+ "</div>"
		);

	var $row = $("<div class='row'>").hide();


	for ( var i = 0; i < 4; i++ ) {
		var $newFront = $panel.clone();
		var $newBack = $panel.clone();
		var $clone = $column.clone();

		$("<h3>Front</h3><p>Card " + i + " front</p>")
			.appendTo($newFront.find(".panel-body"));

		$("<h3>Back</h3><p>Card " + i + " back</p>")
			.appendTo($newBack.find(".panel-body"));

	/*	var $newFront = $("<h3>Front</h3><p>Card " + i + " front</p>");

		var $newBack = $("<h3>Back</h3><p>Card " + i + " back</p>");
	*/
		var newCard = flipJS($newFront.get(), $newBack.get());

		$clone.append(newCard).appendTo($row);
	}

	$(".container").append($row);
	$row.show();
}