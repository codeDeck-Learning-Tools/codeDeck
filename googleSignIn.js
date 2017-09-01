// First, we perform the signInWithRedirect.
// Creates the provider object.

var provider = new firebase.auth.GoogleAuthProvider();

// You can add additional scopes to the provider:
provider.addScope( 'email' );

// Sign in with redirect:
auth.signInWithRedirect( provider );

/// /////////////////////////////////////////////////////////
// The user is redirected to the provider's sign in flow...
/// /////////////////////////////////////////////////////////

// Then redirected back to the app, where we check the redirect result:
auth.getRedirectResult().then( function redirectResult ( result ) {
    // The firebase.User instance:
    var user = result.user;

    // The Google Sign In firebase.auth.AuthCredential containing the Google Sign In
    // access token:
    var credential = result.credential;

    // As this API can be used for sign-in, linking and reauthentication,
    // check the operationType to determine what triggered this redirect
    // operation.
    var operationType = result.operationType;
}, function redirectOp ( error ) {
    // The provider's account email, can be used in case of
    // auth/account-exists-with-different-credential to fetch the providers
    // linked to the email:
    var email = error.email;

    // The provider's credential:
    var credential = error.credential;

    // firebase.auth().signOut().then(function() {
    // // Sign-out successful.   
    // }).catch(function(error) {
    // // An error happened.
    // });

    // In case of auth/account-exists-with-different-credential error,
    // you can fetch the providers using this:
    if ( error.code === 'auth/account-exists-with-different-credential' ) {
        auth.fetchProvidersForEmail( email ).then( function fetch ( providers ) {

            // The returned 'providers' is a list of the available providers
            // linked to the email address. Please refer to the guide for a more
            // complete explanation on how to recover from this error.
        } );
    }
} );
