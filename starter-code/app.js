const express = require('express');
const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const path           = require('path');

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', (req, res) => {
  client.getRandomJoke()
    .then(function (response) {
      // do stuff here
      res.render('random', response);
  })
    .catch(function (err) {
      // handle error
  });
});

app.get('/categories', (req, res) => {
  let category = req.query.cat;

  if (category) {
      client.getRandomJoke(category).then(function (response) {
        res.render('joke-by-category', {
          value: response.value,
          category
        });
      });
    } else {
      client.getJokeCategories().then(function (response) {
        // do stuff here
        res.render('categories', { value: response});
      }).catch(function (err) {
        // handle error
      });
    }

});

app.post('/search', (req, res) => {
  let keyword = req.body.keyword;

  client.search(keyword).then((jokes) => {
    let randomIndex = Math.floor(Math.random() * jokes.items.length -1);

    let joke = jokes.items[randomIndex];

    res.render('joke-by-search', {
      joke: joke.value,
      query: keyword
    });
  });
});

app.listen(3000, ()=> console.log('Example app listening on port 3000!'))
