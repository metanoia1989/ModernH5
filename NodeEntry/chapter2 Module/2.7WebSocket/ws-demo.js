var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3004 });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  ws.send('I am a message sent from a ws server');
});
