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

// Adds cards in database to deck
database.getCards = function(callback) {
	// 	Parameters:
	//		callback: 	function to call when cards succesfully
	//							returned from database

	// TODO: check sessionStorage for deck

	// get a snapshot from the firebase reference
	// that points to the deck to use
	database.refCards.once("value", function(snapshot) {
		snapshot.forEach(function(childSnap) {

			// add each child (card object) to the deck
			deck.addCard(childSnap.val());
		});

		// TODO: save deck to sessionStorage

		// run callback function
		callback();

	// log error with firebase request
	}, function(err) {
		console.log("Error loading cards from database:", err);
	});
}


/*
	deck
	-----------------------------------------------------------------

	Object for a flash card deck. May only have one deck at a time.
*/
var deck = (function() {
	var allCards = [];
	var cards = [];	
	var discarded = [];

	return {
		// --- public methods --- //

		// adds a card to all cards and cards arrays
		addCard: function(card) {
			allCards.push(card);
			cards.push(card);
		},
		// Returns array containing all card objects in deck
		getAllCards: function() {
			return allCards;
		},

		// Returns array containing current cards (not discarded)
		getCurrentCards: function() {
			return cards;
		},

		// Pops a card from the cards array and returns it.
		popCard: function() {
			var poppedCard = cards.pop();
			discarded.push(poppedCard);
			return poppedCard;
		},

		// Sets cards to discarded and empties discarded array.
		reset: function() {
			cards = allCards;
			discarded = [];
		},

		// sets the allCards array and reset cards
		setCards: function(arrCards) {
			allCards = arrCards;
			this.reset();
		},

		// Randomizes the order of the cards. Returns true if succesful.
		shuffle: function() {
			// do nothing and log an error if cards aren't set
			if ( cards.length === 0 ) {
				console.log("deck error: No cards to shuffle.");
				return false;
			}
			// shuffle array of cards in place
			cards.sort(function (a,b) { return 0.5 - Math.random() });
			return true;
		}
	};
})();

/*
	Test Code
	----------------------------------------------------------------*/
// renders each card in arrCards in the element with id = colId
function renderColumn(colId, arrCards) {
	$.each(arrCards, function() {
		$("<p>").text(this.front.text).appendTo("#" + colId);
	})
}
/*
// teset deck.shuffle();
// get cards from database and show them before the shuffle on the left
// and after the shuffle on the right.
database.getCards(function() {
	renderColumn("col1", deck.getAllCards());
	deck.shuffle();
	renderColumn("col2", deck.getAllCards());
});
*/
/*
// test deck.popCard()
database.getCards(function() {
	deck.shuffle();
	renderColumn("col1", deck.getAllCards());
	renderColumn("col2", [deck.popCard()]);
	console.log(deck);

});
*/
/*
// test deck.reset()
database.getCards(function() {
	console.log(deck.getAllCards());
	// pop 3 cards from the deck
	for ( var i = 0; i < deck.getAllCards().length && i < 3; i++ ) {
		console.log("popped card:", deck.popCard());
	}
	console.log(deck.getCurrentCards());
	deck.reset();
	console.log(deck.getCurrentCards());
});
*/