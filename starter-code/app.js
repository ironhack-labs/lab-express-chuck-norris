const express = require('express');
const Chuck  = require('chucknorris-io');

const app = express();
const client = new Chuck();

let randomJoke;

app.listen(3000, () => {
    console.log('levantado servidor')
})

// our first Route
app.get('/', (request, response, next) => {
    response.send('<p> CHUCK NORRIS ES DIOS</p>');
  });





// random joke Route
app.get('/random', (request, response, next) => {

    // Retrieve a random chuck joke
    client.getRandomJoke()
    .then((response) => {
    randomJoke = response.value;
    }).catch((err) => {
    randomJoke = 'ops Chuck parece que está indispuesto...'
    });

    response.send(randomJoke);
  });

  console.log(randomJoke);