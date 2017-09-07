/*
	Calls to Giphy's API for gifs to display to the user
	upon reaching a progress checkpoint.
*/

var giphyGIF = {
  apiKey: "f3971dc19c6240feab39b26de85716d1",
  limit: 3,
  ratingLimit: "pg-13",

  // invokes the ajax request, and displays it on the user's page
  search: function() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?";

    // compile search parameters
    queryURL += $.param({
      api_key: this.apiKey,
      q: "congratulations",
      limit: this.limit,
      rating: this.ratingLimit
    });

    // done response also takes the url's from the results array objects, then puts them into the html
    return $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      console.log(results);

      $("#gif1").html('<img src="' + results[0].images.fixed_height.url + '">');
      $("#gif2").html('<img src="' + results[1].images.fixed_height.url + '">');
      $("#gif3").html('<img src="' + results[2].images.fixed_height.url + '">');
    });
  }
};

var giphyLoad = function() {
  $("#gifModal").modal("show");
};
