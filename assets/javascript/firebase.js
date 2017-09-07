// Initialize Firebase
var config = {
    'apiKey': 'AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo',
    'authDomain': 'codedeck-17e00.firebaseapp.com',
    'databaseURL': 'https://codedeck-17e00.firebaseio.com',
    'projectId': 'codedeck-17e00',
    'storageBucket': '',
    'messagingSenderId': '82313729151'
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);

    /*
        ----- database -----
    
        Reference to firebase.database object with added application
        specific properties and methods. *** Be careful not to override
        the names defined in the firebase api.
    */
    var database = firebase.database();
    database.refCards = database.ref('cards');

    // Adds cards in database to deck
    database.getCards = function (callback) {

        // holds card objects retried from database
        var cards = [];

        // add cards to the cards array from the database
        database.refCards.once('value', function (snapshot) {
            snapshot.forEach(function (childSnap) {
                cards.push(childSnap.val());
            });

            // run callback if one was passed to this func.
            if (typeof callback !== 'undefined') {
                callback(cards);
            }

        // error with firebase request
        }, function (err) {
            // do nothing
        });
    };
}