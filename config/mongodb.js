'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGO_URI,
  { 
    useMongoClient: true
  }
).then((db) => console.log(`MongoDB connected to ${process.env.MONGO_URI}`));

module.exports = mongoose;