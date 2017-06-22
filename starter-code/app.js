const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(express.static('public'));
// app.use(expressLayouts);

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index', data);
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('random', response);
  });
});

app.get('/categories', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    client.getJokeCategories()
    .then((response)=>  {
      res.render('categories', {categories: response});
    })
  } else {
    client.getRandomJoke(req.query.cat)
    .then((response) => {
      res.render('random', response);
    });
  };
});

app.get('/search', (req, res, next) => {
  res.render('search', data);
});

app.listen(3000, () => {
  console.log ('My first app listening on port 3000!');
});
