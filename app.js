'use strict';

const express = require('express'),
      path = require('path'),
      exphbs = require('express-handlebars'),
      mongoose = require('./config/mongodb'),
      app = express(),
      methodOverride = require('method-override'),
      flash = require('express-flash-2'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      MongoStore = require('connect-mongo')(session),
      port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'xpto_secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(function(req,res,next){
  res.locals.session = req.session;

  next();
});

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Idea = require('./models/idea')(mongoose);
const User = require('./models/user')(mongoose);;

const ideasRouter = require('./routes/ideas')(express.Router(), Idea, flash, session);
const usersRouter = require('./routes/users')(express.Router(), User, flash, session);

app.use('/ideas', ideasRouter);
app.use('/users', usersRouter);

require('./router')(app, mongoose, express);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
