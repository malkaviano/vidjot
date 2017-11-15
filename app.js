'use strict';

const express = require('express'),
      path = require('path'),
      exphbs = require('express-handlebars'),
      mongoose = require('./mongodb'),
      app = express(),
      port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

require('./router')(app, mongoose, express);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
