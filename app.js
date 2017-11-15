'use strict';

const express = require('express'),
      exphbs = require('express-handlebars'),
      mongoose = require('./mongodb'),
      app = express(),
      port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes')(app, mongoose);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});