// to be moved into logic.js with the rest of the js
// parameters q - search query term or phrase
// limit - number of results to return. default 25
// offset - results offset, default 0
// rating - (y, g, pg, pg-13, r)
// fmt - return results in html or json format

// pseudocode
// make giphy object with set parameters for ajax call to giphy
// GET url from 3 gif objects, pass to function
// modify images object to have fixed format
// run function when card counter function exceeds x

/*
	giphyAPI ajax, points counter function,
	to be added to logic.js
	giphyAPI 
*/


$() () {
var giphyAPI = {
	apiKey: "f3971dc19c6240feab39b26de85716d1",
	host: "https://api.giphy.com/v1/gifs/search?q=",
	limit: 3,
	ratingLimit: "pg-13",
	
	// giphy method
	search: function (searchString) {
		var queryURL = "https://api.giphy.com/v1/gifs/search?";
		
		if (typeof searchString !== 'string'
			|| searchString.length === 0) {
				return false;
			}
			
			queryURL += $.param({
				api_key: this.apiKey,
				q: searchString,
				limit: this.limit,
				rating: this.ratingLimit
			});
			
			return $.ajax({
				url: queryURL,
				method: "GET"
			})
		
			.done(function (response) {
				var results = response.data;
				
				for (var i = 0; i < results.length; i++) {
					if (results[i].rating == "pg-13" || results[i].rating == "g") {
						var gifDiv = $("<div class='gif1'>");
						var gifs = $("<img>");
						gifs.attr("src", results[i].images.fixed_height.url);
						gifDiv.append(gifs);
					}
				}
		}
		}
	};
	
	// GET images object from within api-returned gif object, maybe fixed_width object (200px width, good for mobile)
	
	// var gifRender = {
		
	// }
	
	
	// function to increment count variable. 
	// once count > limit, calls giphyAPI function to play gifs
	$(function () {
		// initialize var count to 0
		var count = 0;
		// function to increment count when the next card button is clicked
		// only set to next card. going back to a previous card won't add to the count
		$("#nextCard").click(function () {
			count++;
			$("#nextCard").html("Current card count is: " + count);
		});

		if (count === 10) {
			giphyGIF();
			count = 0;
		}
	});