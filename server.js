var express = require('express')
var server = express();
var flickrConnector = require('./flickr-connector');

// Enable cors
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET method route
server.get('/api/getFeed', function (req, res) {
    console.log('received request', req.param("q"));

    // Get flickr connector module and execute
    flickrConnector.get({ q: req.param("q"), l: req.param("l") }) (req, res, function(result) {
        console.log('got result', result);
        if (!result.error) {
            // Return flickr feed data with a specific structure
            res.send(result.data.map(d => {return {title: d.title, subtitle: d.description, pictureUrl: d.media.m}}));
        }
        else {
            res.status(500);
            res.send('Error while getting flickr feed');
        }
    }
    )
})

server.listen(10000);