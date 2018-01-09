const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.get('/random', (request, response, next) => {
  client.getRandomJoke()
  .then((response) => {
    // use the response here
    console.log(response);

  }).catch((err) => {
    // handle error
    console.log(err)
  });
});

app.listen(3000);
