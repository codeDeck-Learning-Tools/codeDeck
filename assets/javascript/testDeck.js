/*
	This loads a deck with a few cards for testing. Not for final
	production.

	TODO: remove this file once testing is complete.
*/

// Switch the cards in local storage to a smaller deck for testing
var testDeck = (function () {
	var storeKey = 'cards';

	// save the current "full" deck in local storage
	var sFullDeck = localStorage.getItem(storeKey);

	// put the first 3 cards into local storage
	var arrSmallDeck = JSON.parse(sFullDeck).slice(0, 3);
	localStorage.setItem(storeKey, JSON.stringify(arrSmallDeck));

	return {
		// restore local storage to the initial state
		restoreFullDeck: function () {
			localStorage.setItem(storeKey, sFullDeck);
		},
	}
})();