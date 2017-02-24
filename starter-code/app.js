const express = require('express');
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const client = new Chuck();

const myApp = express();

myApp.set('views', __dirname + '/views');
myApp.use(express.static('public'));
myApp.set('view engine', 'ejs');
myApp.use(expressLayouts);
myApp.set('layout', 'layouts/main-layout');
myApp.use(bodyParser.urlencoded({ extended: true }));


myApp.get('/', (req, res, next ) => {

  client.getRandomJoke()
  .then((response) => {
    const joke = response.value;
    res.render('index', {
      joke: joke
    });
  }).catch((err) => {
  });
});

myApp.get('/categories', (req, res, next ) => {

  client.getJokeCategories()
  .then((response)=>  {
    const list = response;
    res.render('categories', {
      categories: list,
    });
  })
  .catch((err)=> {
    // handle error
  });

});

myApp.get('/joke-by-category', (req, res, next) => {
  const links = req.query.links;
  client.getRandomJoke(links)
  .then((response) => {
    const jokeCategory = response.value;
    res.render('joke-by-category', {
      jokeCategory: jokeCategory
    });
  }).catch((err) => {

  });
});

myApp.get('/search', (req, res, next) => {
  res.render('search');
});

myApp.post('/search-joke', (req, res, next) => {
  const user = req.body.search;

  client.search(user).then((response) => {
    const result = response.value;
    res.render('search-result', {
      searchResult: result
    });

  }).catch(function (err) {

  });

});



myApp.listen(3000, () => {
  console.log('Backend app ONLINE!');
});
