const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
// app.use(expressLayouts);

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
  res.render('search', {value: ' ' });
});

app.post('/search', (req, res, next) => {
  const searchTerm = req.query.keyword;

  client.search(searchTerm)
  .then((response) => {
    res.render('search', {value: response });
  }).catch((err) => {
    res.render('search', {value: err });
  });
});

app.listen(3000, () => {
  console.log ('My first app listening on port 3000!');
});
