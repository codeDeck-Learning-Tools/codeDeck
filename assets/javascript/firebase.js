// Initialize Firebase
var config = {
    'apiKey': 'AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo',
    'authDomain': 'codedeck-17e00.firebaseapp.com',
    'databaseURL': 'https://codedeck-17e00.firebaseio.com',
    'projectId': 'codedeck-17e00',
    'storageBucket': '',
    'messagingSenderId': '82313729151'
};

if ( firebase.apps.length === 0 ) {
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

    // get a snapshot from the firebase reference
    // that points to the deck to use
        var cards = [];

        database.refCards.once( 'value', function ( snapshot ) {
            snapshot.forEach( function ( childSnap ) {
            // add each child (card object) to the deck
                // deck.addCard( childSnap.val() );
                cards.push( childSnap.val() );
            } );

            if ( typeof callback !== 'undefined' ) {
                // run callback function
                callback( cards );
            }

        // log error with firebase request
        }, function ( err ) {
            console.log( 'Error loading cards from database:', err );
        } );
    };
}
