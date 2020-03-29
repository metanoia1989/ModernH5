var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('newListener', (eventName) => {
  console.log('new Listener ' + eventName);
});

emitter.on('removeListener', (eventName) => {
  console.log('remove Listener ' + eventName);
});

function foo() {}

emitter.on('save-user', foo);
emitter.removeListener('save-user', foo);