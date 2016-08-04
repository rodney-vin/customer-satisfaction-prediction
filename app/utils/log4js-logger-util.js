/* eslint-env node */

'use strict';

var log4js = require('log4js');
log4js.configure({
  appenders: [
    {type: 'console'},
    {
      type: 'file',
      filename: 'log/scoring_app.log',
      level: 'ALL',
      maxLogSize: 20480,
      backups: 10
    }
  ]
});

var typesOfLogging = ['info', 'warn', 'error', 'fatal', 'trace', 'debug'];

function log(logger, level, param1, param2) {
  if (typeof param2 === 'undefined') {
    // what happened
    logger[level](param1);
  } else {
    // where, what happened
    logger[level]('inside ' + param1 + ', ' + param2);
  }
}

var customLogger = {
  getLogger: function (name) {
    var logger = log4js.getLogger(name);
    var createdLogger = {
      enter: function (where, args) {
        if (typeof args === 'undefined')
          log(logger, 'debug', 'entering ' + where);
        else
          log(logger, 'debug',
                'entering ' + where + ', arg(s): ' + args);
      },
      return: function (where, returnValue) {
        if (typeof returnValue === 'undefined')
          log(logger, 'debug', 'returning from ' + where);
        else
          log(logger, 'debug',
                'returning from ' + where + ', return: ' + returnValue);
      }
    };

    typesOfLogging.forEach(function (logType) {
      createdLogger[logType] = function (where, what) {
        log(logger, logType, where, what);
      };
    });

    return createdLogger;
  }
};

module.exports = customLogger;
