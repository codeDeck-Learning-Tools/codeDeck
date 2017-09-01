// var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().signInWithRedirect(provider);
// firebase.auth().getRedirectResult().then(function(result) {
//   if (result.credential) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // ...
//   }
//   // The signed-in user info.
//   var user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// getRedirectResult() returns firebase.Promise containing non-null firebase.auth.UserCredential

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });





// First, we perform the signInWithRedirect.
// Creates the provider object.

var provider = new firebase.auth.GoogleAuthProvider();

// You can add additional scopes to the provider:
provider.addScope('email');
provider.addScope('user_friends');

// Sign in with redirect:
auth.signInWithRedirect(provider)

////////////////////////////////////////////////////////////
// The user is redirected to the provider's sign in flow...
////////////////////////////////////////////////////////////

// Then redirected back to the app, where we check the redirect result:
auth.getRedirectResult().then(function(result) {

  // The firebase.User instance:
  var user = result.user;

  // The Google Sign In firebase.auth.AuthCredential containing the Google Sign In
  // access token:
  var credential = result.credential;

  // As this API can be used for sign-in, linking and reauthentication,
  // check the operationType to determine what triggered this redirect
  // operation.
  var operationType = result.operationType;
}, function(error) {

  // The provider's account email, can be used in case of
  // auth/account-exists-with-different-credential to fetch the providers
  // linked to the email:
  var email = error.email;

  // The provider's credential:
  var credential = error.credential;

  firebase.auth().signOut().then(function() {
  // Sign-out successful.   
  }).catch(function(error) {
  // An error happened.
  });

  // In case of auth/account-exists-with-different-credential error,
  // you can fetch the providers using this:
  if (error.code === 'auth/account-exists-with-different-credential') {
    auth.fetchProvidersForEmail(email).then(function(providers) {

      // The returned 'providers' is a list of the available providers
      // linked to the email address. Please refer to the guide for a more
      // complete explanation on how to recover from this error.
    });
  }
});
});
