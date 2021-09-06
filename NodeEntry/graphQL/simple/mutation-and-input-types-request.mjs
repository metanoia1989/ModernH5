import fetch from 'node-fetch'

var author = 'andy',
    content = 'hope is a good thing'
var query = `
  mutation CreateMessage($input: MessageInput) {
    createMessage(input: $input) {
      id
    }
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
        variables: { 
          input: { author, content }
        }
    })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));