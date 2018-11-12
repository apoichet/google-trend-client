var express = require('express');
var router = express.Router();
var googleTrends = require('google-trends-api');
var moment = require('moment');
const patternDate = 'YYYY-MM-DD';

router.get('/interestOverTime', (req, res) => {
    console.log(req.query);
    let requestObject = {
        keyword: req.query['keyword'].split(','),
        geo: req.query['geo'],
        h1: req.query['h1']
    };
    console.log(requestObject);
    // Warning Invalid Date
    if (req.query['startTime']) requestObject.startTime = moment(req.query['startTime'], patternDate).toDate();
    if (req.query['endTime'])  requestObject.endTime = moment(req.query['endTime'], patternDate).toDate();

    googleTrends.interestOverTime(requestObject)
        .then(function(results){
            res.send(results)
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
            throw new Error('Trending Interest Over Time Error :'+err.message);
        });
});

module.exports = router;