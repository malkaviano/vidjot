'use strict';

const bcrypt = require('bcryptjs');
const salt = 12;

module.exports = function(router, User, flash, session) {

  router.get('/login', (req, res) => {
    res.render('users/user_form', { title: "Account Login", action: "/users/login", login: "login" });
  });

  router.post('/login', (req, res) => {    
    User.findOne({ email: req.body.email })
        .then(user => {
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if(result) {
              req.session.userId = user._id;
              req.session.username = user.name;
              req.session.email = user.email;

              res.redirect('/ideas');
            } else {
              res.flash('error_msg', 'Wrong password');
              
              res.redirect('/users/login');
            }              
          });
        })
        .catch(err => {
          
          res.flash('error_msg', 'Email not found!');
          
          res.redirect('/users/login');
        });
  });

  router.get('/register', (req, res) => {
    res.render('users/user_form', { title: "Account Register", action: "/users/register" });
  });

  router.post('/register', (req, res) => { 
    const errors = [];

    if (req.body.password != req.body.password2) {
      errors.push({ text: 'Passwords need to be equal!' });
    }

    if (req.body.password.length < 4) {
      errors.push({ text: 'Passwords minimum length is 4!' });
    }

    if (errors.length > 0) {
      res.render(
        'users/user_form',
        {
          title: "Account Register",
          action: "/users/register",
          errors: errors,
          name: req.body.name,
          email: req.body.email
        }
      );
    } else {
      bcrypt.genSalt(salt, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if(err) throw err;

          req.body.password = hash;

          new User(req.body)
            .save()
            .then(user => {
              res.flash('info_msg', 'User registered! Please login.');

              res.redirect('/users/login');
            })
            .catch(err => {
              res.flash('error_msg', 'Email already registered!');
              
              console.log(err);

              res.redirect('/users/register');            
            });
        });
      });
    }

  });

  router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);

        throw err;
      } else {
        res.redirect('/');
      }
    });
  });

  return router;
};
