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


var giphy = {
	apiKey: "f3971dc19c6240feab39b26de85716d1",
	host: "https://api.giphy.com",
	limit: 3,
	ratingLimit: "pg-13",
	
	search: function (searchString) {
		var path = "/v1/gifs/search?";
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
		});
	}
};

// GET images object from within api-returned gif object, maybe fixed_width object (200px width, good for mobile)

var gifRender = {

}


// event handler. run function if card counter points count > x

