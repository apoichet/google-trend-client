var express = require('express');
var router = express.Router();
var googleTrends = require('google-trends-api');
var moment = require('moment');
const patternDate = 'YYYY-MM-DD';

router.get('/interestOverTime', (req, res) => {
    let requestObject = {
        keyword: req.query['keyword'],
        geo: req.query['geo'],
        h1: req.query['h1'],
        timezone: req.query['timezone'],
        category: req.query['category'],
        granularTimeResolution: req.query['granularTimeResolution']
    };
    // Warning Invalid Date
    if (req.query['startTime']) requestObject.startTime = moment(req.query['startTime'], patternDate).toDate();
    if (req.query['endTime'])  requestObject.endTime = moment(req.query['endTime'], patternDate).toDate();

    googleTrends.interestOverTime(requestObject)
        .then(function(results){
            res.send(results)
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
        });
});

module.exports = router;