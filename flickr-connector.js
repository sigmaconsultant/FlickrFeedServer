var request = require('request');
var fetchJsonp = require('fetch-jsonp');
var vm = require('vm');

function get(params) {
    console.log('initializing flickr request');
    return function(req, res, next) {
        console.log('requesting...');
        request('https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=' + params.q, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonpRunner = vm.createContext({jsonFlickrFeed: function(r){return r;}});
                myObject = vm.runInContext(body,jsonpRunner);

                console.log('json object is', myObject);
                next({data: myObject.items});
            }
            else {
                console.log("Error getting feed");
                console.log(error);
                next({error: error});
            }
        })
      
    }
  }

  module.exports.get = get;