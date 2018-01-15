const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const path           = require('path');

const Chuck = require('chucknorris-io');
const client = new Chuck();


// view engine setup
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.set('layout', 'layout');

//Métodos

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  // Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
    res.render('random', {
      response});
  }).catch((err) => {
    console.log(err);
  });
});


app.get('/categories', (req,res, next) => {
let category = req.query.cat;

if (category) {
  client.getRandomJoke(category).then(function (joke) {
    res.render('joke-by-category', {
      joke: joke.value,
      category
    });
  });
} else {
client.getJokeCategories()
  .then((response) => {
    res.render('categories', {
      response });
    });
  }
});


app.get('/search', (req, res, next) => {
    res.render('search-form')
    });





app.listen(3000);
