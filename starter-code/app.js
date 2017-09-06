const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');


app.use(express.static('public'));
app.use(expressLayouts);

app.get('/', (request, response, next) => {
  response.render('index');
});

app.get('/random', (req, res, next)=>{
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
      res.send('<h1>' + response.value + '!</h1>');
    }).catch((err) => {
      console.log("Error on /random", err);
      throw err;
    });
});

app.get('/categories', (req, res, next)=>{
  // Retrieve a random chuck joke
  client.getJokeCategories()
    .then((response) => {
      let data = {cat: response};
      res.render('categories', data);

    }).catch((err) => {
      console.log("Error on /categories", err);
      throw err;
    });
});

app.get('/categories/:category', (req, res, next)=>{
  // Retrieve a random chuck joke
  client.getRandomJoke(req.params.category)
    .then((response) => {
      res.send('<h1>' + response.value + '!</h1>');
    }).catch((err) => {
      console.log("Error on /categories/:category", err);
      throw err;
    });
});




//

// look, 4 params
// geeric error handler is only called by express when one of the above throws an error
app.use((error, request, response, next) => {
  response.render('ups-error');
});



app.listen(3000, () => console.log('running!'));
