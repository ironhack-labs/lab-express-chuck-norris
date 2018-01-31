const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
client.getRandomJoke()
  .then(joke => { let newJoke=joke.value;
    res.render('index',{name: newJoke });
  }).catch((err) => {
    // handle error
  });
});
  app.listen(3000);
