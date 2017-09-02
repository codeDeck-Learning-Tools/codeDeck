// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAGvW613Tfgyi6e7a8e1U1Nh45tSvPjCo",
    authDomain: "codedeck-17e00.firebaseapp.com",
    databaseURL: "https://codedeck-17e00.firebaseio.com",
    projectId: "codedeck-17e00",
    storageBucket: "",
    messagingSenderId: "82313729151"
};
firebase.initializeApp(config);

/*
    ----- database -----

    Reference to firbase.database object with added application
    specific properties and methods. *** Be careful not to override
    the names defined in the firebase api.
*/
var database = firebase.database();
var refCards = database.ref("cards");


/*
	deck
	---------------------------------

	Function for a flash card deck.
*/

// Adds cards in a firebase database to deck.
function loadCards(fbDatabaseRef, deck) {
	// Parameters:
	// fbDatabase: firebaset database reference
	// deck:       flash card deck

	// get a snapshot from the firebase reference
	// that points to the deck to use
	fbDatabaseRef.once("value", function(snapshot) {

		snapshot.forEach(function(childSnap) {
			// add each child (card object) to the deck
			deck.addCard(childSnap.val());
		});
		console.log(deck.getAllCards());
	}, function(err) {
		console.log("Error loading cards from database:", err);
	});

}

var deck = (function() {
	var cards = [];

	return {

	// --- public properties --- //



	// --- public methods --- //
	addCard: function(card) {
		cards.push(card);
	},
	getAllCards: function() {
		return cards;
	},

	// sets the cards
	setCards: function(arrCards) {
		cards = arrCards;
	},

	// Randomizes the order of the cards
	shuffle: function() {}

	};
})();

/*
	Test Code
	----------------------------------------------------------------*/
loadCards(refCards, deck);