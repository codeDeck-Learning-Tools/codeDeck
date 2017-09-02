/*
	deck.js
	-----------------------------------------------------------------
	Contains code to initialize firebase, retrieve the data, deck object
	code, and code to test the deck object (commented out).

	This module is not intended to be included in production. Rather, 
	the code required should be copied to logic.js or another
	appropriate file. Some of the firebase code is likely redundant or
	may require revision for the final application.

	Contents
		1 Initialize Firebase
		2 databse
		3 deck object
		4 test code

	Initial version by JD.
*/

// Initialize Firebase
var config = {
    'apiKey': 'AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo',
    'authDomain': 'codedeck-17e00.firebaseapp.com',
    'databaseURL': 'https://codedeck-17e00.firebaseio.com',
    'projectId': 'codedeck-17e00',
    'storageBucket': '',
    'messagingSenderId': '82313729151'
};
firebase.initializeApp( config );

/*
    ----- database -----

    Reference to firebase.database object with added application
    specific properties and methods. *** Be careful not to override
    the names defined in the firebase api.
*/
var database = firebase.database();
database.refCards = database.ref( 'cards' );

// Adds cards in database to deck
database.getCards = function ( callback ) {
    // 	Parameters:
    //		callback: 	function to call when cards succesfully
    //							returned from database

    // TODO: check sessionStorage for deck

    // get a snapshot from the firebase reference
    // that points to the deck to use
    database.refCards.once( 'value', function ( snapshot ) {
        snapshot.forEach( function ( childSnap ) {
            // add each child (card object) to the deck
            deck.addCard( childSnap.val() );
        } );

        // TODO: save deck to sessionStorage

        // run callback function
        callback();

        // log error with firebase request
    }, function ( err ) {
        console.log( 'Error loading cards from database:', err );
    } );
};

/*
	deck
	-----------------------------------------------------------------

	Object for a flash card deck. May only have one deck at a time.
*/
var deck = ( function () {
    var allCards = [];
    var cards = [];
    var discarded = [];

    return {
        // --- public methods --- //

        // adds a card to all cards and cards arrays
        'addCard': function ( card ) {
            allCards.push( card );
            cards.push( card );
        },
        // Returns array containing all card objects in deck
        'getAllCards': function () {
            return allCards;
        },

        // Returns array containing current cards (not discarded)
        'getCurrentCards': function () {
            return cards;
        },

        // Pops a card from the cards array and returns it.
        'popCard': function () {
            var poppedCard = cards.pop();
            discarded.push( poppedCard );
            return poppedCard;
        },

        // Sets cards to discarded and empties discarded array.
        'reset': function () {
            cards = allCards;
            discarded = [];
        },

        // sets the allCards array and reset cards
        'setCards': function ( arrCards ) {
            allCards = arrCards;
            this.reset();
        },

        // Randomizes the order of the cards. Returns true if succesful.
        'shuffle': function () {
            // do nothing and log an error if cards aren't set
            if ( cards.length === 0 ) {
                console.log( 'deck error: No cards to shuffle.' );
                return false;
            }
            // shuffle array of cards in place
            cards.sort( function ( a, b ) { return 0.5 - Math.random(); } );
            return true;
        }
    };
} )();

/*
	Test Code
	---------------------------------------------------------------- */
// renders each card in arrCards in the element with id = colId
function renderColumn ( colId, arrCards ) {
    $.each( arrCards, function () {
        $( '<p>' ).text( this.front.text ).appendTo( '#' + colId );
    } );
}
/*
// teset deck.shuffle();
// get cards from database and show them before the shuffle on the left
// and after the shuffle on the right.
database.getCards(function() {
	renderColumn("col1", deck.getAllCards());
	deck.shuffle();
	renderColumn("col2", deck.getAllCards());
});
*/
/*
// test deck.popCard()
database.getCards(function() {
	deck.shuffle();
	renderColumn("col1", deck.getAllCards());
	renderColumn("col2", [deck.popCard()]);
	console.log(deck);

});
*/
/*
// test deck.reset()
database.getCards(function() {
	console.log(deck.getAllCards());
	// pop 3 cards from the deck
	for ( var i = 0; i < deck.getAllCards().length && i < 3; i++ ) {
		console.log("popped card:", deck.popCard());
	}
	console.log(deck.getCurrentCards());
	deck.reset();
	console.log(deck.getCurrentCards());
});
*/

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

var card = {
    'author': 'JD',
    'back': {
        'text': 'Get remote data from the remote repository for ALL…ry without merging it with the working directory.'
    },
    'front': {
        'text': 'git fetch --all'
    },
    'tags': 'git code develop fetch',
    'topic': 'git'
};

// test ajaxWikiExtracts

ajaxWikiExtracts( card.tags, function ( extracts ) {
    console.log( extracts );

    // render the extracts
    var $targetDiv = $( '#wikiLinks' );
    $.each( extracts, function () {
        $( getExtractElement( this ) ).appendTo( $targetDiv );
    } );
} );

$( '#signIn' ).on( 'click', click );

// First, we perform the signInWithRedirect.
// Creates the provider object.
function click ( ) {
    // Initialize Firebase
    // var config = {
    //     'apiKey': 'AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo',
    //     'authDomain': 'codedeck-17e00.firebaseapp.com',
    //     'databaseURL': 'https://codedeck-17e00.firebaseio.com',
    //     'projectId': 'codedeck-17e00',
    //     'storageBucket': 'codedeck-17e00.appspot.com',
    //     'messagingSenderId': '82313729151'
    // };
    // firebase.initializeApp( config );

    var provider = new firebase.auth.GoogleAuthProvider();

    // You can add additional scopes to the provider:
    provider.addScope( 'email' );

    firebase.auth().signInWithPopup( provider ).then( function siPop ( result ) {
        var token = result.credential.accessToken;
        localStorage.setItem( 'token', token );
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem( 'user', user );

        /**
         * This is where you will forward the user onto the next
         * page.
         */
        document.location = '/deck.html';
    } ).catch( function errorCB ( error ) {
        alert( 'Authentication failed.' );
        console.log( error );
    } );
};
