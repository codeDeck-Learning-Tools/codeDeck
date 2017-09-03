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
