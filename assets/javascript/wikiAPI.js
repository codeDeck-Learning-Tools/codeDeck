/*
    Move the code in the ajaxWikiExtracts function into
    logic.js when ready. -John D.
*/

/*
    ajaxWikiExtracts
    ----------------
    Makes an AJAX request to the the Wikipedia API.

    Parameters:
        q:       type string   - search term or terms
        success: type function - callback for ajax response
*/
function ajaxWikiExtracts(q, success) {
    console.log("ajaxWikiExtracts called");
    var apiUrl = 'https://en.wikipedia.org/w/api.php';
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
            // console.log("response received");
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

/*
    Test Code
    -------------------------------------------------------- */

// test ajaxWikiExtracts

ajaxWikiExtracts("git develop code", function(extracts) {
    console.log(extracts);
});