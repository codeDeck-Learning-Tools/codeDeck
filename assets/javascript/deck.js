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

    Reference to firebase.database object with added application
    specific properties and methods. *** Be careful not to override
    the names defined in the firebase api.
*/
var database = firebase.database();
database.refCards = database.ref("cards");

// Adds cards in database to deck.
database.loadCards = function(oDeck) {
	// 	Parameters:
	// 		fbDatabase: 	firebaset database reference
	// 		oDeck:      	flash card deck

	// get a snapshot from the firebase reference
	// that points to the deck to use
	database.refCards.once("value", function(snapshot) {
		snapshot.forEach(function(childSnap) {

			// add each child (card object) to the deck
			oDeck.addCard(childSnap.val());
		});
		console.log(oDeck.getAllCards());

	// log error with firebase request
	}, function(err) {
		console.log("Error loading cards from database:", err);
	});
}


/*
	deck
	---------------------------------

	Function for a flash card deck.
*/
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
database.loadCards(deck);