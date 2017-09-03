/*
    Contains two functions to be added to logic.js or the appropriate
    file for production. Code for testing at the bottom.

    Contents:
        1   ajaxWikiExtracts function
        2   getExtractElement function
        3   test code

    Example element returned by getExtracts:     
    <div>
        <a href="https://en.wikipedia.org/wiki/Code%20review">
            Code review
        </a>
        <p>Code review is systematic examination (sometimes referred 
            to as peer review) of computer source code. It is intended
            to find mistakes overlooked in software development, 
            improving the overall quality
            of...</p>
    </div>
*/

/*
    ajaxWikiExtracts
    ----------------
    Makes an AJAX request to the the Wikipedia API.

    Parameters:
        q:       type string   - search term or terms
        success: type function - callback for ajax response
*/
function ajaxWikiExtracts ( q, success ) {
    var apiUrl = 'https://en.wikipedia.org/w/api.php';
    $.ajax( {
        'url': apiUrl,
        'dataType': 'jsonp',

        // parameters to configure the response
        'data': {
            'action': 'query',
            'format': 'json',

            // generator paramters. search for titles or 
            // content that match q. 
            'generator': 'search',
            'gsrsearch': q,
            'gsrnamespace': 0,
            'gsrlimit': 10, // pages returned. max is 50.

            // parameters for extracts
            'prop': 'extracts',
            'exchars': 200, // 1,200 is the maximum
            'exlimit': 'max', // number of extracts returned
            'exintro': true, // only return text before section
            'explaintext': true // return plain text
        },

        // success function passed to method
        'success': function ( response ) {
            // console.log("response received");
            var articles = [];

            $.each( response.query.pages, function () {
                var url = encodeURI(
                    'https://en.wikipedia.org/wiki/' + this.title );
                articles.push( {
                    'title': this.title,
                    'text': this.extract,
                    'url': url
                } );
            } );
            success( articles );
        },
        'error': function ( err ) {
            console.log( 'wpAPI Error:', err );
        }
    } );
}

// Returns html element for an extract object.
function getExtractElement ( extract ) {
    var $containerDiv = $( '<div>' );
    var $link = $( '<a>' );
    var $extract = $( '<p>' );

    // set the href of the link and use the title for the
    // text of the link
    $link.attr( 'href', extract.url ).text( extract.title );

    // text of extract goes in a p element
    $extract.text( extract.text );

    // append content and return the container element
    return $containerDiv.append( [$link, $extract] ).get();
}

/*
    Test Code
    -------------------------------------------------------- */

// var card = {
//     'author': 'JD',
//     'back': {
//         'text': 'Get remote data from the remote repository for ALL…ry without merging it with the working directory.'
//     },
//     'front': {
//         'text': 'git fetch --all'
//     },
//     'tags': 'git code develop fetch',
//     'topic': 'git'
// };

// // test ajaxWikiExtracts

// ajaxWikiExtracts( card.tags, function ( extracts ) {
//     console.log( extracts );

//     // render the extracts
//     var $targetDiv = $( '#wikiLinks' );
//     $.each( extracts, function () {
//         $( getExtractElement( this ) ).appendTo( $targetDiv );
//     } );
// } );
