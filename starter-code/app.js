/*jshint esversion: 6*/
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
//tell our app ejs is in charge of html rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//new chuck object getRandomJoke



// point to public folder to find static files
app.use(express.static('public'));


//      /random route
app.get('/random', (request, res) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('index', {joke: response.value});
  }).catch((err) => {
    // handle error
  });
});

// /categories route

app.get('/categories', (request, res) => {
  client.getJokeCategories()
  .then((response) => {
    console.log(response);
    res.render('categories', {joke: response});
  }).catch((err) => {
    // handle error
  });
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
