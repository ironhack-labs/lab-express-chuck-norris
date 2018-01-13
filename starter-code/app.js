const express = require('express');
const Chuck  = require('chucknorris-io');

const app = express();
const chuck = new Chuck();

let randomJoke;


/* Middlewares config */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



// our first Route
app.get('/', (request, response, next) => {
    response.send('<p> CHUCK NORRIS ES DIOS</p>');
  });


// random joke Route
app.get('/random', (req, res, next) => {

    // Retrieve a random chuck joke
    chuck.getRandomJoke()
    .then((response) => {
    randomJoke = res.value;
    }).catch((err) => {
    randomJoke = 'ops Chuck parece que está indispuesto...'
    });
    console.log(randomJoke);

    res.random('randomJoke', {joke: randomJoke});
  });

// categories Route
app.get('/categories', (req, res) => {

  let = categories = ['dev', 'B', 'C'];
  let params = {
    categories: categories
  }
  res.random('categories', params);
});


// and finalyy we stand up the server!!!
app.listen(3000, () => console.log('servidor levantado!'));



