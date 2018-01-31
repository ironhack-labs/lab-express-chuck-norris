const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    res.render('index',{joke: response.value});
  }).catch((err) => {
    // handle error
  });  
});

app.listen(3000);

