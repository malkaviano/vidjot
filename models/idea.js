'use strict';

module.exports = function(mongoose) {
  
  mongoose.model('idea', new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }));

  return mongoose.model('idea');
};