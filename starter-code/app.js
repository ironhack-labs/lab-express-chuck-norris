const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Retrieve a random chuck joke

app.get('/random', (request, response, next) => {
  client.getRandomJoke().then((joke) => {
    console.log(joke);
    response.render('index', {juan: joke.value});
  });
});


app.get('/categories', (request, response, next) => {
  client.getJokeCategories().then((categories) => {
    console.log(categories);
    response.render('categories', {categories: categories});
  });
});


  app.listen(3000, () => {
    console.log('My first app listening on port 3000!');
  });
