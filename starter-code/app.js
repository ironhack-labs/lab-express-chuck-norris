const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('random', response);
  });
});


app.get('/categories', (req, res) => {
  if (req.query.cat !== undefined) {
    client.getRandomJoke(req.query.cat)
    .then((response) => {
      response.cat = req.query.cat;
      res.render('joke-by-category', response);
    });
  } else {
    client.getJokeCategories()
    .then((response) => {
      res.render('categories', {categories: response});
    })
  };
});

app.get('/search', (req, res, next) => {
  res.render('search', {jokes: []});
});

app.post('/search', (req, res, next) => {
  const searchTerm = req.body.keyword;

  client.search(searchTerm)
  .then((response) => {
    let jokes = response.items;
    res.render('search', { jokes: jokes } );
  }).catch((err) => {
    res.render('search', { jokes: err });
  });
});

app.listen(3000, () => {
  console.log ('My first app listening on port 3000!');
});
