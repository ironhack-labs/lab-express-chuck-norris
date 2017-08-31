const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next ) => {
  res.render('home.ejs');
});

//create a random joke
app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((jokeInfo) => {
      res.locals.chuck = jokeInfo;
      res.render('index.ejs');
      console.log(jokeInfo);
    }).catch((err) => {});
});

//choose joke based on categories
app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
    .then((jokeCat) => {
      res.locals.chucks = jokeCat;
      res.render('categories.ejs');
      console.log(jokeCat);
    }).catch((err) => {});
});


app.get('/oneCat', (req, res, next) => {
  client.getRandomJoke(req.query.cat)
    .then((jokeInfo) => {
      res.locals.chuck = jokeInfo;
      res.render('index.ejs');
      console.log(jokeInfo);
    }).catch((err) => {});
});

//search by keyword
app.get('/search', (req, res, next ) => {
  res.render('joke-by-keyword.ejs');
});

app.get('/searchResult', (req, res, next) => {
  client.search(req.query.mySearchTerm)
    .then((jokeInfo) => {
      res.locals.chuck = jokeInfo;
      res.render('keyword-result.ejs');
      console.log(jokeInfo);
    }).catch((err) => {});
});


app.listen(3000);
