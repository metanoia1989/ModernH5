const { series, parallel } = require('gulp');

function clean(cb) {
    cb(); 
}

function css(cb) {
    cb(); 
}

function javascript(cb) {
    cb(); 
}

exports.build = series(clean, parallel(css, javascript));