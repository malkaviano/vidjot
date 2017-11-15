'use strict';

const methodOverride = require('method-override'),
      flash = require('express-flash-2'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session);

module.exports  = function(app, mongoose) {
  const bodyParser = require('body-parser'),
        Idea = require('./models/idea')(mongoose);

  app.use(methodOverride('_method'));

  app.use(session({
    secret: 'xpto_secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));

  app.use(flash());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/about', (req, res) => {
    res.render('about');
  });
  
  app.get('/ideas', (req, res) => {

    Idea.find({})
        .sort({ date: 'descending' })
        .then(ideas => {
      res.render('ideas/index', { ideas: ideas });
    });
    
  });
  
  app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
  });
  
  app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => { res.render('ideas/edit', { idea: idea }) });
  });

  app.post('/ideas', (req, res) => {
    let errors = [];

    if (!req.body.title) {
      errors.push({ text: 'Field Title is required' });
    }

    if (!req.body.details) {
      errors.push({ text: 'Field Details is required' });
    }

    if (errors.length > 0) {
      res.render(
        'ideas/add',
        {
          errors: errors,
          title: req.body.title,
          details: req.body.details    
        }
      );
    } else {
      new Idea(req.body)
        .save()
        .then(idea => {
          res.flash('info_msg', 'Idea was saved!');
          
          res.redirect('/ideas');
        });
    }
  });

  app.put('/ideas/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => {
          idea.title = req.body.title;
          idea.details = req.body.details;

          idea.save()
              .then(idea => {
                res.flash('info_msg', 'Idea was saved!');

                res.redirect('/ideas');
              });
        });
  });

  app.delete('/ideas/:id', (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
          res.flash('info_msg', 'Idea was deleted!');

          res.redirect('/ideas')
        });
  });
}