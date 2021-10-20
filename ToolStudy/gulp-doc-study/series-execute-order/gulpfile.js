const { series } = require('gulp');


function javascript(cb) {
    console.log("javascript")
    cb()
}

function css(cb) {
    console.log("css")
    cb()
}

exports.build = series(javascript, css);