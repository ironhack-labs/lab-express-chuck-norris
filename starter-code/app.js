const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    res.render('index', {
      joke: response
    });

  }).catch((err) => {
    // handle error
    console.log(err)
  });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    // use the response here
    res.render('categories');
  })
  .catch((err)=> {
    // handle error
    console.log(err)
  });
});



app.listen(3001);
