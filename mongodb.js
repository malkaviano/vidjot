'use strict';

const mongoose = require('mongoose'),
      db = require('./config/database');

mongoose.Promise = global.Promise;

mongoose.connect(
  db.mongoURI,
  { 
    useMongoClient: true
  }
).then((db) => console.log(`MongoDB connected to ${db.mongoURI}`));

module.exports = mongoose;