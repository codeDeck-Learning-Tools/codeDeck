var cards = JSON.parse( localStorage.getItem( 'cards' ) || [] );

if ( cards.length ) {
    /**
     * Build the cards
     */
    cards.forEach( function ( card, i ) {
        console.log( renderCard( 'card-' + i, card ) );
        // $( '#card-list' ).append(  );
    } );
}
