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
    res.render('random', {response});
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/categories', (req,res, next) =>
client.getJokeCategories()
  .then((response) => {
    res.render('categories', {
      response
    })
  })
  .catch((err) => {
    console.log("There is an error with the category")
  }));

app.get('/joke-by-category', (req,res, next) =>
  client.getRandomJoke(param)
    .then((response) => {
      // use the response here
    }).catch((err) => {
      // handle error
    }));


app.listen(3000);
