'use strict';

if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://vidjot_user:vidjotmongo@ds113775.mlab.com:13775/vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}