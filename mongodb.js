'use strict';

const mongoose = require('mongoose'),
      collection = 'vidjot-dev';

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://localhost/${collection}`,
  { useMongoClient: true }
).then((db) => console.log(`MongoDB connected to ${collection}`));

module.exports = mongoose;