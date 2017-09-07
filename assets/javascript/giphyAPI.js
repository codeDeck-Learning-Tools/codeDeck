var giphyGIF = {
  apiKey: "f3971dc19c6240feab39b26de85716d1",
  host: "https://api.giphy.com/v1/gifs/search?q=",
  limit: 3,
  ratingLimit: "pg-13",

  search: function() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?";

    // compile search url
    queryURL += $.param({
      api_key: this.apiKey,
      q: "congratulations",
      limit: this.limit,
      rating: this.ratingLimit
    });

    return $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      console.log(results);

			$("#gif1").html('<img src="' + results[0].images.fixed_height.url + '">');
			$("#gif2").html('<img src="' + results[1].images.fixed_height.url + '">');
			$("#gif3").html('<img src="' + results[2].images.fixed_height.url + '">');
			// var gifBox = $("tr").children();
			
			// gifBox(0).html('<img src="' + results.url[0] + '">');
			// gifBox(1).html(results.data.url[1]);
      // gifBox(2).html(results.data.url[2]);
    });
  }
};

// thinking to put a 3column x 1row table in the modal
// table>tr>td

giphyGIF.search();
