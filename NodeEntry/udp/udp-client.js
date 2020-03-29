const dgram = require("dgram");

var message = new Buffer.from("some message from server.");
var socket = dgram.createSocket("udp4");

socket.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('client send ' + bytes + 'message');
});

socket.on("message", (msg, rinfo) => {
  console.log("some message from server");
});