'use strict';

var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    debug   = require('debug')('PskReplicant:client');

var pouchOptions = {
  mode: 'fullCouchDB'
};


app.use('/', require('express-pouchdb')(PouchDB, pouchOptions));

module.exports = app;
