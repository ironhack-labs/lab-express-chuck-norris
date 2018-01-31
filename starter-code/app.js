'use strict';

const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

// configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);

// routes
app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((joke) => {
    let data = {
      txt: joke.value
    };

    res.render('random', data);
  }).catch((err) => {
    // handle error
  });
});

// start app
app.listen(3030, () => {
  console.log('Easy web dev. 3030!');
});
