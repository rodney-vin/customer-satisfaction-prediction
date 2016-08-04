/* eslint-env node */

'use strict';

var fs = require('fs');
var morgan = require('morgan');

var logDirectory = 'log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = fs.createWriteStream(
  'log/scoring_app.log',
  {flags: 'a'}
);

module.exports = function (logsType) {
  if (typeof logsType === 'undefined') {
    logsType = 'dev';
  }
  var logger = morgan(logsType, {stream: accessLogStream});
  return logger;
};
