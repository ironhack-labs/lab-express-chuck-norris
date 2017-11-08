'use strict';

const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

// app.get('/', (req, res, next) => {
//   res.send('Hello');
// });


// -- setup
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// -- routes

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then((response) => {
      const data = {
        joke: response
      }
      res.render("random", {
        data
      });
    }).catch((err) => {
      // handle error
      console.log(err);
    });
});

app.get('/categories', (req, res) => {
  client.getJokeCategories()
    .then((result) => {
      const data = {
        categories: result
      };
      res.render('categories', {
        data
      });
    })
    .catch((err) => {
      console.log(err);
    });
})


// -- 404


// -- start the server

app.listen(3000)
