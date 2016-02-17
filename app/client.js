var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    debug   = require('debug')('PskReplicant:client');
    
// app.get('/', function(req, res, next) { 
//   res.send('Welcome Traveler!  <a href="/express-pouchdb/_utils">Fauxton?</a>');
// });

var pouchOptions = {
  mode: 'minimumForPouchDB',
  overrideMode: {
    include: ['routes/fauxton']
  }
};

app.use('/', require('express-pouchdb')(PouchDB, pouchOptions));


// require('express-pouchdb')(pouchDb);

// var pouchApp = require('express-pouchdb')( pouchDb,
// {
//   mode: 'minimumForPouchDB',
//   overrideMode: {
//     include: ['routes/fauxton']
//   }
// }
// );
// 
// pouchApp.setPouchDB(require('pouchdb'));
// 
// 
// app.use('/db', pouchApp );

 

module.exports = app;

//app.listen(3001);