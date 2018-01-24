const express = require('express');
const Chuck  = require('chucknorris-io');
const bodyParser = require('body-parser');

const app = express();
const client = new Chuck();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((response) => {
      res.render('random', {response});
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories().then((response) => {
      res.render('categories', {response});
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/joke-by-category', (req, res, next) => {
  const category = req.query.cat;
  client.getRandomJoke(category).then((response) => {
      res.render('joke-by-category', {response});
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/search', (req, res, next) => {
  res.render('search');
});

app.post('/search', (req, res, next) => {
  const searchTerm = req.body.searchJoke;
  client.search(searchTerm).then((response) => {
      res.render('search-result', {response});
    }).catch(function (err) {
      console.log(err);
    });
});

app.listen(3000);