var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Player() {
  EventEmitter.call(this);
}

util.inherits(Player, EventEmitter);

var player = new Player();

player.on('pause',() => {
  console.log('paused');
});

player.on('play',() => {
  console.log('playing');
});

player.emit('play');