const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

// our first Route:
app.get('/random', (request, res, next) => {
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      // use the response here
      res.send(`<p>${response.value}</p>`);
      // res.send(console.log(response));
    }).catch((err) => {
      // handle error
    });
});

// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});