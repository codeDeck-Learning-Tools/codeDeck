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
    Authentication code
    --------------------------------------------------------------- */
$( '#signIn' ).on( 'click', click );
function click ( ) {
    var provider = new firebase.auth.GoogleAuthProvider();

    // You can add additional scopes to the provider:
    provider.addScope( 'email' );

    firebase.auth().signInWithPopup( provider ).then( function siPop ( result ) {
        var token = result.credential.accessToken;
        localStorage.setItem( 'token', token );
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem( 'user', JSON.stringify( user ) );

        /**
         * This is where you will forward the user onto the next
         * page.
         */
        document.location = 'deck.html';
    } ).catch( function errorCB ( error ) {
        alert( 'Authentication failed.' );
        console.log( error );
    } );
};

/*
 Sign-in
    -----------------------------------------------------------------

    Checking for all requirements prior to passing to deck.html
*/

$( '#submit-info' ).on( 'click', pass );
function pass () {
    if (
        $( '#first-name' ).val() &&
        $( '#last-name' ).val() &&
        $( '#email' ).val() ) {
        document.location = 'deck.html';
    } else {
        alert( 'Please complete required fields.' );
    }
}

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
    Functions for rendering a card
    --------------------------------------------------------------- */
// Returns an html element for a card
function getCardElement ( front, back ) {
    // card height in pixels
    var cardHeight = 250;

    // jquery objects for elements
    var $cardDiv = $( '<div>' );
    var $front = $( '<div>' );
    var $back = $( '<div>' );

    // height must be fixed else text overflow problems may occur
    $cardDiv
        .append( [$front, $back] )
        .css( 'height', cardHeight + 'px' );

    // give each side the panel class from bootstrap
    $front.addClass( 'panel panel-default front' );
    $back.addClass( 'panel panel-default back' );

    // add a panel-body with text for each side of card
    $( '<div>' )
        .text( front )
        .addClass( 'panel-body' )
        .appendTo( $front );
    $( '<div>' )
        .text( back )
        .addClass( 'panel-body' )
        .appendTo( $back );

    // add flip behavior to card
    $cardDiv.append( [$front, $back] ).flip( {

        // setting for flip animation
        // front:           ".front", // jquery selector for front
        // back:            ".back", // jquery sel for back
        'reverse': true, // card flips back in opposit direction
        'speed': 300, // speed in ms
        'forceHeight': true // forces height of card to that of container
    } );

    return $cardDiv.get();
}

// Renders a card in the element with an id = containerId. Reterns
// the container element
function renderCard ( containerId, card, reverse = false ) {
    var cardEl;
    if ( reverse ) {
        // swap front and back parameters to reverse the card
        cardEl = getCardElement( card.back.text, card.front.text );
    } else {
        // get card in standard (not reversed) configuration
        cardEl = getCardElement( card.front.text, card.back.text );
    }
    // append the card to the container and return the element
    var container = $( '#' + containerId ).append( cardEl ).get();
    return container;
}

/*
    Test Code
    --------------------------------------------------------------- */
// renders each card in arrCards in the element with id = colId
// function renderColumn ( colId, arrCards ) {
//     $.each( arrCards, function () {
//         $( '<p>' ).text( this.front.text ).appendTo( '#' + colId );
//     } );
// }
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

// test to display a card
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
/* var cardEl = getCardElement(card.front.text, card.back.text);
$("#card-container")
    .append(cardEl); */
/*
// test normal front first configuration
// renderCard("card-container", card);

// test reversed (back first) config.
// $("#card-container").css("height", "250px");
renderCard( 'card-container', card, true );

// set additional properties on card
$( '.front, .back' ).css( {
    'padding-top': '2em'
} );

// add some margin above the card
$( '#card-container' ).css( 'margin-top', '2em' );

*/

// Sign in with Google authentication
// First, we perform the signInWithRedirect.
// Creates the provider object.
