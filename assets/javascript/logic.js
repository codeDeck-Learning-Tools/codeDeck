
$( '#signIn' ).on( 'click', click );

// First, we perform the signInWithRedirect.
// Creates the provider object.
function click ( ) {
    // Initialize Firebase
    var config = {
        'apiKey': 'AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo',
        'authDomain': 'codedeck-17e00.firebaseapp.com',
        'databaseURL': 'https://codedeck-17e00.firebaseio.com',
        'projectId': 'codedeck-17e00',
        'storageBucket': 'codedeck-17e00.appspot.com',
        'messagingSenderId': '82313729151'
    };
    firebase.initializeApp( config );

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
