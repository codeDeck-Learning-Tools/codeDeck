
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
