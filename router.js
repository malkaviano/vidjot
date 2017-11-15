'use strict';

const methodOverride = require('method-override'),
      flash = require('express-flash-2'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      MongoStore = require('connect-mongo')(session);

module.exports  = function(app, mongoose, express) {
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

  const Idea = require('./models/idea')(mongoose);
  const User = undefined;
  
  let ideasRouter = require('./routes/ideas')(express.Router(), Idea, flash, session);
  let usersRouter = require('./routes/users')(express.Router(), User, flash, session);

  app.use('/ideas', ideasRouter);
  app.use('/users', usersRouter);
  

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/about', (req, res) => {
    res.render('about');
  });
}
