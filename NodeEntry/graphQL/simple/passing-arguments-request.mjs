import fetch from 'node-fetch'

var dice = 3, sides = 6;
var query = `
    query RollDice($dice: Int!, $sides: Int) {
        rollDice(numDice: $dice, numSides: $sides)
    }
`;
var url = 'http://localhost:4545/graphql'
fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
        query,
        variables: { dice, sides}
    })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));