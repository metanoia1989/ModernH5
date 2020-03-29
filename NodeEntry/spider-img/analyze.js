const cheerio = require("cheerio");

function findImg(dom, callback) {
  let $ = cheerio.load(dom);
  $("img").each((i, elem) => {
    let imgSrc = $(elem).attr('src');
    console.log('imgSrc', imgSrc);
    callback(imgSrc, i);
  });
}

module.exports.findImg = findImg;