'use strict';

module.exports = function(mongoose) {
  
  mongoose.model('user', new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }));

  return mongoose.model('user');
};