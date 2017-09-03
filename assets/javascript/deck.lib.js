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
