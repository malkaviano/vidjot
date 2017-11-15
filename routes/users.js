'use strict';

module.exports = function(router, User, flash, session) {

  router.get('/login', (req, res) => {
    res.render('users/login');
  });

  router.get('/register', (req, res) => {

  });

  return router;
};
