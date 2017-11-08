"use strict";
const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {

  client.getRandomJoke().then((joke) => {

    res.render('index', joke);
  }).catch((err) => {
    console.log('ur fucked ' + err);
  });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories().then((response) => {
    const data = {
      categories: response,
    }
    res.render('categories', data);
  });
});


app.listen(3000);
