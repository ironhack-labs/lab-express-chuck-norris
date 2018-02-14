const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const bodyParser = require('body-parser');
const client = new Chuck();
const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('home'));

app.get('/random', (req, res) => {
  client
    .getRandomJoke()
    .then(response => {
      res.render('index', { joke: response.value });
    })
    .catch(err => {
      throw err;
    });
});

app.get('/categories', (req, res) => {
  client
    .getJokeCategories()
    .then(response => {
      res.render('categories', { categories: response });
    })
    .catch(err => {
      throw err;
    });
});

app.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  client
    .getRandomJoke(category)
    .then(response => {
      res.render('joke-by-category', { categoryJoke: response.value });
    })
    .catch(err => {
      throw err;
    });
});

app.get('/search', (req, res) => res.render('search-form'));

app.post('/search', (req, res) => {
  const searchTerm = req.body.keyword;
  client
    .search(searchTerm)
    .then(function(response) {
      res.render('joke-by-search', { joke: response.items });
    })
    .catch(function(err) {
      throw err;
    });
});
app.listen(port, () => console.log(`listening on ${port}`));
