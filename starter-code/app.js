const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck = require('chucknorris-io');

const app = express();
const client = new Chuck();

app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main-layout.ejs');
app.set('views','views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('home-view.ejs');
});

app.get('/random', (req, res, next) => {

  client.getRandomJoke().then((jokeData) => {

    res.render('random-joke-view.ejs', {
        joke: jokeData.value,
    });
  });

});

app.get('/categories', (req, res, next) => {

  client.getJokeCategories().then((jokeCategories) => {

    res.render('categories-view.ejs', {
        jokeCat: jokeCategories,
    });
  });

});

app.get('/search', (req, res, next) => {

  client.getRandomJoke().then((jokeData) => {

    res.render('search-view.ejs', {
        joke: jokeData.value,
    });
  });

});

app.listen('3000');
