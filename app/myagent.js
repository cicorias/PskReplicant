var https = require('https');
var url = require('url');

module.exports = function (options) {
  options = options || {};
  var agent = new https.Agent(options);

  return agent;
};