const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, res, next) => {
  res.render('index');
});


app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((joke) => {
      // use the response here
      res.render('random', {joke :joke.value});
    });
});


app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
      res.render('categories', {response});
    });
});

app.listen(3000);
