var webpack = require("webpack");
var fs = require("fs");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

module.exports = {
  entry: "main.js",
  target: 'node',
  output: {
    filename: 'index.js'
  },
  externals: nodeModules
}