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

// initialize deck with cards from the database
refCards.once("value", function(snapshot) {
	snapshot.forEach(function(childSnap) {
		deck.addCard(childSnap.val());
	});
	console.log(deck.getCards());

}, function(err) {
	console.log("Firebase Error:", err);
});




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
	getCards: function() {
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