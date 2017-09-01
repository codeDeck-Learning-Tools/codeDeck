// deck object. only contains a cards property which in array
// of cards objects. Using an object to allow additional meta
// data to be attached to the deck
{
	// cards an object where each property is a unique key assigned by
	// the firebase api.
	cards: {
		key: 'card object',
		key: 'card object'
		// ... more cards
	}

}

// card object. for the case of git flash cards, the back should be
// a clue or question asking for a git command. the front should be
// a git command and/or command option as on would type it in the
// console. For now, i don't foresee adding images, but I wanted to
// include the property in the object schema from the start.
{
	front: 
		{
			text: 'string',
			img: 'string - img url'
		},
	back: 
		{
			text: 'string',
			img: 'string - img url'
		},
	author: 'string',
	tags: 'string - csv',
	topic: 'string'
}