var Readable = require('stream').Readable;
var util = require('util');

util.inherits(MyReadable, Readable);

function MyReadable(array) {
  // 如果 objectMode 设置为 false 在消耗数据时会转换为 buffer
  Readable.call(this, { objectMode: true });
  this.array = array;
}

MyReadable.prototype._read = function() {
  if (this.array.length) {
    this.push(this.array.shift());
  } else {
    this.push(null);
  }
};