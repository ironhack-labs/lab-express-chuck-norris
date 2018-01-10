const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const path = require('path');

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('index', response);
  }).catch((err) => {
    console.log('Error')
  });
});

app.listen(3000);
