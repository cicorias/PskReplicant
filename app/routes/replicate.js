var express = require('express');
var router = express.Router();
var debug = require('debug')('PskReplicant:replicate');

var PouchDB = require('pouchdb');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('replicate', { title: 'Replicate' });
});


router.post('/', function (req, res, next) {
    debug('posted request');
    var PouchDB = require('pouchdb');
    var localDB = new PouchDB('foobar')
    var remoteDB = new PouchDB('http://localhost:3001/foobarrepl')


    localDB.replicate.to(remoteDB).on('complete', function () {
        debug('done replication');
    }).on('error', function (err) {
        debug('error on replication');
        debug(err);
    });


    res.render('replicate', { title: 'Replicate' });

    //next();
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