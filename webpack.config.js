const path = require("path");

module.exports = {
    entry :"./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'vr-stat.bundle.js'
    }
}