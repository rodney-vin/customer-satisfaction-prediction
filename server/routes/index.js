/* eslint-env node */

'use strict';

var express = require('express');
var envRouter = express.Router();
var PMClient = require('../pm_client');

/*
 * GET all available models in PA service
 */

envRouter.get('/models', function (req, res) {
  var pmEnv = req.app.get('pm service env');
  var pmClient = new PMClient(pmEnv);
  pmClient.getModels(function (err, models) {
    if (err) throw err;
    res.json(models);
  });
});

/*
 * Get Score
 */

envRouter.post('/score/:contextId', function (req, res) {
  var contextId = req.params.contextId;
  var scoringData = req.body.scoringData;
  var tableName = req.body.tableName;

  scoringData = scoringData.split('\n');
  scoringData = scoringData.map(function (row) {
    return row.split(',').map(function (v) {
      return v.trim();
    });
  });

  var pmEnv = req.app.get('pm service env');
  var pmClient = new PMClient(pmEnv);
  pmClient.getModel(contextId, function (err, model) {
    if (err) {
      throw err;
    }

    var scoreParam = {
      'tablename': tableName,
      'header': Object.keys(model.tableData[tableName]),
      'data': scoringData
    };

    pmClient.getScore(contextId, scoreParam, function (err, score) {
      if (err) {
        res.status(500);
        res.json({error: err});
      }
      res.json(score);
    });
  });
});

exports.env = envRouter;
