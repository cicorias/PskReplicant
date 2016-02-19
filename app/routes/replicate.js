var express = require('express');
var router = express.Router();
var debug = require('debug')('PskReplicant:replicate');
var https = require('https');

var PouchDB = require('pouchdb');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('replicate', { title: 'Replicate' });
});


//PSK stuff
var pskey = new Buffer('d731ef57be09e5204f0b205b60627028');
var identity = 'TestUser';
var pskCiphers = 'PSK-AES128-CBC-SHA:PSK-AES256-CBC-SHA:PSK-3DES-EDE-CBC-SHA:PSK-AES128-CBC-SHA';

function clientCallback(hint) {
  debug('inside the client callback');
  var rv = { identity: identity, key: pskey }
  return rv;
}

router.post('/', function (req, res, next) {
    
    debug('posted request');
    var PouchDB = require('pouchdb');
    var localDB = new PouchDB('foobar')

    var ajaxOptions = { ajax : {
        agentOptions:{
            rejectUnauthorized: false,
            pskClientCallback : clientCallback,
            ciphers: pskCiphers,
            pskIdentity: identity,
            pskKey : pskey
        }            
    }};
    
    var remoteDB = new PouchDB('https://localhost:3001/foobarrepl', ajaxOptions)

    localDB.replicate.to(remoteDB).on('complete', function () {
        debug('done replication');
    }).on('error', function (err) {
        debug('error on replication');
        debug(err);
    });


    res.render('replicate', { title: 'Replicate' });

});


router.post('/add', function (req, res, next) {
    debug('adding a new record...');
    var db = new PouchDB('foobar');
    var doc = {
        "_id": guid(),
        "name": "Mittens",
        "occupation": "kitten",
        "age": 3,
        "hobbies": [
            "playing with balls of yarn",
            "chasing laser pointers",
            "lookin' hella cute"
        ]
    };

    db.put(doc);
    debug('done a new record...');

    res.render('replicate', { title: 'Replicate' });
})


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = router;
