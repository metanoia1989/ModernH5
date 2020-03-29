const dgram = require("dgram");
var message = new Buffer.from("some message from server.");

var socket = dgram.createSocket("udp4", (msg, rinfo) => {
  console.log(msg.toString());
  socket.send(message, 0, message.length, rinfo.port, rinfo.address, (err, bytes) => {
    if (err) {
      console.log(error);
      return;
    }
    console.log("send " + bytes + " message");
  });
});

socket.bind(41234, "localhost", () => {
  console.log("bind 41234");
});