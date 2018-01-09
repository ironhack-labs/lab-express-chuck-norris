const express = require('express');
const Chuck  = require('chucknorris-io');

const app = express();
const client = new Chuck();

// our first Route
app.get('/', (request, response, next) => {

    response.send('<p> </p>');
  });



// Retrieve a random chuck joke
client.getRandomJoke()
  .then((response) => {
    // use the response here
  }).catch((err) => {
    // handle error
  });

