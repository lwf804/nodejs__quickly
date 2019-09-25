var path = require('path');
var fs = require('fs');
var { rootPath } = require('../utils');

var babelPath = rootPath + '/.babelrc';
var alias = {};
if (fs.existsSync(babelPath)) {
  var babelrc = JSON.parse(fs.readFileSync(babelPath).toString());
  if (Array.isArray(babelrc.plugins)) {
    var moduleResolver = babelrc.plugins.find(plugin => Array.isArray(plugin) && plugin.length >= 2 && plugin[0] === 'module-resolver')[1];
    if ('alias' in moduleResolver && typeof moduleResolver.alias === 'object' && Object.keys(moduleResolver.alias).length !== 0) {
      Object.keys(moduleResolver.alias).forEach(p => alias[p] = path.resolve(rootPath, moduleResolver.alias[p]));
    }
  }
}

module.exports = {
  resolve: {
    alias,
  },
};
