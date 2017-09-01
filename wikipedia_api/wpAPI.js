var wpAPI = (function() {
    var apiUrl = 'https://en.wikipedia.org/w/api.php';

    return {
        /*
        Searches wikipedia for articles that match a term with an
        ajax request.

        Paremeters:
            q - search string
            success - type function(articles) - function to call
                      on successful response from api
        */
        ajaxArticleSearch: function(q, success) {
            $.ajax({
                url: apiUrl,
                dataType: 'jsonp',

                // parameters to configure the response
                data: {
                    action: 'query',
                    format: 'json',

                    // generator paramters. search for titles or 
                    // content that match q. 
                    generator: 'search',
                    gsrsearch: q,
                    gsrnamespace: 0,
                    gsrlimit: 10,       // pages returned. max is 50.

                    // parameters for extracts
                    prop: 'extracts',
                    exchars: 200,       // 1,200 is the maximum
                    exlimit: 'max',     // number of extracts returned
                    exintro: true,      // only return text before section
                    explaintext: true,  // return plain text
                },

                // success function passed to method
                success: function(response) {
                    var articles = [];

                    $.each(response.query.pages, function() {
                        var url = encodeURI(
                            "https://en.wikipedia.org/wiki/"+ this.title);
                        articles.push({
                            title: this.title,
                            text: this.extract,
                            url: url
                        });
                    });
                    success(articles);
                },
                error: function(err){
                    console.log("wpAPI Error:", err);
                }
            });
        }
    };
})();

/*
    Demo Code
    ------------------------------------------------------------------
*/

$(document).ready( function() {
    $("#btnGo").on("click", function() {
        console.log("clicked go");
        var qText = $("#txtSearchTerms").val().trim();

        // run the search and log the result
        wpAPI.ajaxArticleSearch(qText, function(articles) {

            var resultsDiv = $("#searchRes").empty();

            // append each article to the div
            $.each(articles, function() {
                $("<h3>").text(this.title).appendTo(resultsDiv);
                $("<a>")
                    .attr({
                        "href": this.url,
                        "target": "_blank"
                    })
                    .text(this.url)
                    .appendTo(resultsDiv);
                $("<p>").text(this.text).appendTo(resultsDiv);
            });
        });
    });
});