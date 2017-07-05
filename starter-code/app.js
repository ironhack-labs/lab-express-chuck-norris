/*jshint esversion: 6 */

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

const bodyParser = require('body-parser');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((response) => {
      let joke = response.value;
      res.render('random', {joke:joke});
    })
    .catch((err) => {
      //handle error
      console.log("Sorry no jokes for you now!");
    });
});

app.get('/categories', (req, res, next) => {
  console.log("Categories!");
  client.getJokeCategories()
    .then((response) => {
      let jokeCat = response;
      console.log(jokeCat);
      res.render('categories', {jokeCat});
    })
    .catch((err) => {
      //handle error
    });
});

app.get('/categories/:cat', (req, res, next) => {
  console.log("Root beer!!", req.params.cat);
  client.getRandomJoke(req.params.cat)
    .then((response) => {
      console.log(response);
      let joke = response.value;
      res.render('random', {joke});
    })
    .catch((err) => {
      //handle error
      console.log("Sorry no jokes for you now!");
    });
});



app.get('/search', (req, res, next) => {
  res.render('search-form');
});

app.post('/search', (req, res) => {
  console.log("REQ.BODY", req.body);
  client.search(req.body.userInput)
  .then(function (response) {
    res.render('search', {response});
  }).catch(function (err) {
    console.log("Luke, I am your father");
  });
});


app.listen(3000, () => {
  console.log("Listening at port 3000");
});
