const express = require('express');
const router = express.Router();
const googleTrends = require('google-trends-api');
const moment = require('moment');
const patternDate = 'YYYY-MM-DD';

router.get('/interestOverTime', (req, res) => {
    console.log('request', req.query);
    let requestObject = {
        keyword: req.query['keyword'].split(','),
        geo: req.query['geo'],
        hl: req.query['hl'],
        timezone: req.query['timezone'],
        granularTimeResolution: req.query['granularTimeResolution'],
        category: req.query['category']
    };
    console.log('request object', requestObject);
    // Warning Invalid Date
    if (req.query['startTime']) requestObject.startTime = moment(req.query['startTime'], patternDate)
        .utc(true)
        .toDate();
    if (req.query['endTime'])  requestObject.endTime = moment(req.query['endTime'], patternDate)
        .utc(true)
        .toDate();
    googleTrends.interestOverTime(requestObject)
        .then(function(results){
            console.log('response', results);
            res.send(results)
        })
        .catch(function(err){
            console.error('Oh no there was an error', err);
            throw new Error('Trending Interest Over Time Error :'+err.message);
        });
});

module.exports = router;
