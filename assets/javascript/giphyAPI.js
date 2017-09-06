// to be moved into logic.js with the rest of the js
// parameters q - search query term or phrase
// limit - number of results to return. default 25
// offset - results offset, default 0
// rating - (y, g, pg, pg-13, r)
// fmt - return results in html or json format


/*
giphyAPI ajax, points counter function,
to be added to logic.js
giphyAPI 
*/

// object with giphy properties
var giphyGIF = {
	apiKey: "f3971dc19c6240feab39b26de85716d1",
	host: "https://api.giphy.com/v1/gifs/search?q=",
	limit: 3,
	ratingLimit: "pg-13",

	search: function () {
		var queryURL = "https://api.giphy.com/v1/gifs/search?";

		// compile search url
		queryURL += $.param({
			api_key: this.apiKey,
			q: "congratulations",
			limit: this.limit,
			rating: this.ratingLimit
		});

		// return $.ajax({
		// 	url: queryURL,
		// 	method: "GET"
		// });
	},

	// experimenting with fetch method, which should do the same task
	render: $(function ($) {
		fetch("https://api.giphy.com/v1/gifs/random?tag=congratulations&rating=pg-13&api_key=f3971dc19c6240feab39b26de85716d1&limit=3").then(function (response) {
			return response.json();
		}).then(function (result) {
			$("myModal").html('<img src="' + result.data.image_url + '">');
		});
	});
	// semi-colon syntax error?
}

// function giphyGIF() {
// 	event.preventDefault();
// 	/* id of html div for bootstrap modal
// 	data-focus=""?
// 	https://v4-alpha.getbootstrap.com/components/modal/ */

// 	$("#myModal").load()
// 	// jslint: Expected an identifier and instead saw '('.
// 	// storing array of results


// 	for (var i = 0; i < results.length; i++) {
// 		if (results[i].rating == "pg-13" || results[i].rating == "g") {
// 			var gifDiv = $("<div class='gif1'>");
// 			var gifs = $("<img>");
// 			gifs.attr("src", results[i].images.fixed_height.url);
// 			gifDiv.append(gifs);
// 		}
// 	}
// }
// }
// };

// function to increment count variable. 
// once count > limit, calls giphyAPI function to play gifs
function counter() {
	// initialize var count to 0
	var count = 0;
	// function to increment count when the next card button is clicked
	// only set to next card. going back to a previous card won't add to the count
	$("#nextCard").click(function () {
		count++;
		$("#nextCard").html("Current card count is: " + count);
	});

	if (count === 10) {
		giphyGIF.render();
		count = 0;
	}
});
