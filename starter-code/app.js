'use strict'

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Retrieve a random chuck joke
app.get('/random', (req, res, next) => {
  client.getRandomJoke()
    .then((joke) => {
      let randomJ = {
        pJoke: joke.value
      }
      res.render('index', randomJ);
    }).catch((err) => {
      console.log(error);
      return next;
    });
});


app.get('/categories', (req, res, next) => {
  client.getJokeCategories()
    .then((categories)=>  {
      let data = {
        categories
      };

      res.render('index', data)
      })
      // use the response here
  
    .catch((err)=> {
      console.log(error);
        return next;
    });
})

  // START APP
//starting server on host 3000
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});