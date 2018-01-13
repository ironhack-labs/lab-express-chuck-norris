// require modules

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const Chuck  = require('chucknorris-io');
const client = new Chuck();

// Middlewares config
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// App routes

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    console.log(response)
    res.render('random', {
      randomJoke: response
    });
  }).catch((err) => {
    console.log("There is an error");
  });
});

app.get('/categories', (req, res, next) => {
  res.render('categories');
});

app.listen(3000, () => console.log("ready!"));
