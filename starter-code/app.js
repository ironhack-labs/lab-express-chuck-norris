const express = require('express');
const Chuck  = require('chucknorris-io');

const app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

const client = new Chuck();

// Iteration 1 - Get Random Joke
app.get('/random', (req, res, next) => {
    client.getRandomJoke().then(function (response) {
      res.render('random', {joke: response.value});
  }).catch(function (err) {
      // handle error
  });
});

app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {
    res.render('categories', {categories: response});
  })
  .catch((err)=> {
    // handle error
  });
});
 
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});

