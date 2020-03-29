const request = require("request");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const analyze = require("./analyze");

function start() {
  request(config.url, (err, res, body) => {
    console.log("start spider!");
    if (!err && res) {
      console.log("get content!");
      analyze.findImg(body, download);
    }
  });
}

function download(imgUrl, i) {
  console.log(imgUrl);
  let ext = imgUrl.split(".").pop();
  let imgPath = path.join(config.imgDir, i + "." + ext);
  request(imgUrl).pipe(fs.createWriteStream(imgPath), { "encoding": "utf8" });
  console.log(i);
}

start();