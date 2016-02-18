var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    debug   = require('debug')('PskReplicant:client');
    
// app.get('/', function(req, res, next) { 
//   res.send('Welcome Traveler!  <a href="/express-pouchdb/_utils">Fauxton?</a>');
// });
// 
// var pouchOptions = {
//   mode: 'minimumForPouchDB',
//   overrideMode: {
//     include: ['routes/fauxton']
//   }
// };

var pouchOptions = {
  mode: 'fullCouchDB'
};


app.use('/', require('express-pouchdb')(PouchDB, pouchOptions));

module.exports = app;
