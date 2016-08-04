/* eslint-env node*/

'use strict';


// ----------------------------------------------------------------------------
// Model Executor
// ----------------------------------------------------------------------------
// express server
var express = require('express');
// Error handler for development mode
var morganLogger = require('../app/utils/morgan-logger-util')('combined');
var log4js = require('../app/utils/log4js-logger-util');
var logger = log4js.getLogger('server/index');
// cfenv provides access to your Cloud Foundry environment
// (https://www.npmjs.com/package/cfenv)
var cfenv = require('cfenv');
// FileSystem module
var fs = require('fs');
// Request body parser
var bodyParser = require('body-parser');
// load application routes
var routes = require('./routes');

// create a new express server
var app = express();

var devMode = ('development' === app.get('env'));
var testMode = ('test' === app.get('env'));
var cfAppOptions = {};

try {
  if (devMode) {
    let filePath = './config/local.json';
    fs.accessSync(filePath, fs.constants.R_OK);
    let localEnv = JSON.parse(fs.readFileSync(filePath));
    cfAppOptions.vcap = {
      services: localEnv
    };
    logger.info(`Using local CF environment read from ${filePath}`);
  }
} catch (err) {
  logger.debug(`Failed to read the dev config file: ${err}`);
}

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv(cfAppOptions);
var pmServiceEnv = appEnv.services['pm-20'] && appEnv.services['pm-20'][0];

app.set('app env', appEnv);
if (pmServiceEnv) {
  app.set('pm service env', pmServiceEnv);
} else if (!testMode) {
  logger
      .warn('Predictive Analytics service is\
          not linked with your application!');
  logger.warn('Running application with limited functionallity.');
}

// development only
if (devMode) {
  let errorhandler = require('errorhandler');
  app.use(errorhandler());
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpack = require('webpack');
  var config = require('../webpack.config.js');
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    quiet: true
  }));

}

// serve the files out of ./public/build as our main files
app.use(express.static(__dirname + '/../public/build'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morganLogger);

app.use('/env', routes.env);

function start() {
  // start server on the specified port and binding host
  app.listen(appEnv.port, appEnv.host, function () {
    // print a message when the server starts listening
    logger.info('server starting on ' + appEnv.url);
  });
}

exports.app = app;
exports.start = start;
