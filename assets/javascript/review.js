/*
    review.js

    This file contains code for rendering content on review.html.

    Requirements:
        * Array of cards to display must be stored in local storage 
          under the 'cards' key.
        * deck.lib.js
        * wikiAPI.js
        * giphyAPI.js
*/
// array of flash cards
var cards;

// array of urls for gifs
var arrGifs = [];

// ids for content containers
var cardContainerId = "card-container";
var wikiContainerId = "wiki-links";
var resetDeckBtnId = "reset-deck";

// active card pulled from the deck
var currentCard;

// initialize the card deck
initDeck();

// show the first card
handleNextCardBtn();

// request urls for gifs from giphy api
ajaxGiphy(arrGifs);

// Handles click event on the next card button
function handleNextCardBtn() {
    // if the user has gone through the deck ...
    if (!deck.cardsRemaining()) {
        // ... user has gone through the deck
        // unset current card and update view
        currentCard = null;
        renderEndOfDeck(cardContainerId);

        // if cards remain in the deck ...		
    } else {
        // ... get the next card and render it
        currentCard = deck.popCard();

        // ajax request to wikipedia api for the wiki content and
        // render on successful response
        ajaxWikiExtracts(currentCard.tags, renderWikiContent);
        renderCard(cardContainerId, currentCard);
    }
}

// initializes the deck object from cards in local storage
function initDeck() {
    // retrieve cards array from local storage
    cards = JSON.parse(localStorage.getItem('cards') || []);

    // set the cards for the deck
    deck.setCards(cards);
    deck.shuffle();
}
/*
    Functions for rendering a card
    --------------------------------------------------------------- */
// Returns an html element for a card
function getCardElement(front, back = false) {
    // add styling as needed to the outer div containing the card sides
    var cardCss = {
        "border-radius": "25px",
        "background": "green",
        "height": "250px"
        // "width": "450px"
    };
    var btnClass = 'btn btn-primary' +
        ' btn-sm pull-right next-btn';

    // jquery objects for elements
    var $cardDiv = $('<div>');
    var $front = $('<div>');
    var $back = $('<div>');
    var $btn = $('<button class="' + btnClass +
        '">Next</button>');

    // height must be fixed else text overflow problems may occur
    $cardDiv
        .append([$front, $back])
        .css(cardCss);

    // give each side the corresponding class
    $front.addClass('front');
    $back.addClass('back');

    // add styling and properties to each side of the card
    // front
    $('<div>')
        .append($("<p class='card-front'>").text(front))
        .append($btn.clone())
        .css({
            'padding': '20px'
        })
        .appendTo($front);
    // back
    $('<div>')
        .append($("<p class='card-front'>").text(back))
        .append($btn)
        .css({
            'padding': '20px'
        })
        .appendTo($back);


    // set flip behavior from jQuery.flip.js library
    $cardDiv.append([$front, $back]).flip({

        // setting for flip animation
        'reverse': true, // card flips back in opposit direction
        'speed': 300, // speed in ms
        'forceHeight': true // forces height of card to that of container
    });
    return $cardDiv.get();
}

// Renders a card in the element with an id = containerId. Reterns
// the container element
function renderCard(containerId, card, reverse = false) {
    var cardEl;
    var $cardCont = $("#" + containerId);

    // clear the card container
    $cardCont.empty();

    if (reverse) {
        // swap front and back parameters to reverse the card
        cardEl = getCardElement(card.back.text, card.front.text);
    } else {
        // get card in standard (not reversed) configuration
        cardEl = getCardElement(card.front.text, card.back.text);
    }
    // append the card to the container and return the element
    var container = $cardCont.append(cardEl).get();
    return container;
}

// Renders end of deck view in card container. Returns element.
function renderEndOfDeck(containerId) {

    var endOfDeckText = "End of Deck";

    return $("#" + containerId)
        .empty()
        .append("<div class='end-deck'><p>" + endOfDeckText + "</p></div>")
        // reset deck button
        .append("<button id='" + resetDeckBtnId +
            "' class='btn btn-default pull-right'>Reset</button>")
        .get();
}

/*
    Functions for rendering the wikipedia api content
    ----------------------------------------------------------
*/
// Returns html element for an extract object.
function getExtractElement(extract) {
    var $containerDiv = $('<div>');
    var $link = $('<a>');
    var $extract = $('<p>');

    // set the href of the link and use the title for the
    // text of the link
    $link
        .attr({
            'href': extract.url,
            'target': '_blank'
        })
        .text(extract.title);

    // text of extract goes in a p element
    $extract.text(extract.text);

    // append content and return the container element
    return $containerDiv.append([$link, $extract]).get();
}

// Function to render the wiki articles.
function renderWikiContent(arrWiki) {
    $wikiContainer = $("#" + wikiContainerId);
    $wikiContainer.empty();

    // render each object in arrWiki
    $.each(arrWiki, function () {
        $wikiContainer.append(getExtractElement(this));
    });
}


$(document).ready(function () {

    // if there are cards ...
    if (cards.length) {

        // ... listen for click events on the card container
        $("#" + cardContainerId).on('click', function (e) {
            // if reset deck button is clicked
            if (e.target.id === resetDeckBtnId) {

                // reset the deck and shuffle
                initDeck();
                deck.shuffle();

                // display the first card
                handleNextCardBtn();

                // if next card button is clicked ...
            } else if (e.target.nodeName === 'BUTTON') {
                handleNextCardBtn();
            }
        });
    }
});
