const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded( {extended: true} ));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      res.render('random', {
        response // viene del .then(response), que a su vez viene del método getRandomJoke()
      });
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
    .then((response) => {
      res.render('categories', {
        response
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/joke-by-category', (req, res, next) => {
  let category = req.query.cat;
  client.getRandomJoke(category)
    .then((response) => {
      res.render('joke-by-category', {
        response
      });
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/search', (req, res, next) => {
  res.render('search-form');
});

app.post('/search', (req, res, next) => {
  let searchTerm = req.body.searchJoke;
  client.search(searchTerm)
    .then(function (response) {
      res.render('search-result', {
        response
      });
    }).catch(function (err) {
      console.log(err);
    });
});



app.listen(3000, () => {
  console.log('Todo va bien.')
})
